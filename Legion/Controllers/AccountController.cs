namespace Legion.Controllers
{
    using System.Threading.Tasks;

    using Legion.Attributes;
    using Legion.Models;
    using Legion.Models.Data;
    using Legion.Services;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;

    [SecurityHeaders]
    [Authorize]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly ILogger<AccountController> logger;
        private readonly ITokenService tokenService;
        private readonly IUserService userService;

        public AccountController(
            IUserService userService,
            ITokenService tokenService,
            ILoggerFactory loggerFactory)
        {
            this.userService = userService;
            this.tokenService = tokenService;
            this.logger = loggerFactory.CreateLogger<AccountController>();
        }

        [AllowAnonymous]
        [HttpPost("authenticateUser")]
        public async Task<IActionResult> AuthenticateUser([FromBody] UserCredentials userCredentials)
        {
            User user = await this.userService.GetAuthenticatedUserAsync(
                userCredentials.Username,
                userCredentials.Password);

            if (user == null)
            {
                this.logger.LogInformation($"Invalid Username ({userCredentials.Username}) or password");

                return this.Unauthorized();
            }

            var token = this.tokenService.GenerateToken(user);

            return this.Ok(
                new
                {
                    user.Username, user.FirstName, user.LastName, Token = token,
                });
        }

        [HttpPut("changePassword")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest changePasswordRequest)
        {
            var username = this.User.Identity?.Name;

            User user = await this.userService.GetAuthenticatedUserAsync(username, changePasswordRequest.CurrentPassword);

            if (user == null)
            {
                this.logger.LogInformation($"Invalid Change Password attempt for ({username}): invalid current password.");

                return this.Conflict(
                    new ErrorResponse
                    {
                        ErrorCode = ErrorCodes.InvalidCurrentPassword, Message = "Invalid Current Password.",
                    });
            }

            if (changePasswordRequest.NewPassword != changePasswordRequest.RepeatedNewPassword)
            {
                this.logger.LogInformation($"Invalid Change Password attempt for ({username}): new passwords do not match.");

                return this.UnprocessableEntity(
                    new ErrorResponse
                    {
                        Message = "New Password and Repeated Password must match.", ErrorCode = ErrorCodes.MismatchedPasswords,
                    });
            }

            PasswordValidationResult validationResult = await this.userService.ValidateNewPassword(user, changePasswordRequest.NewPassword);

            if (validationResult != PasswordValidationResult.Valid)
            {
                ErrorResponse error = this.GetValidationError(validationResult);
                this.logger.LogInformation($"Invalid Change Password attempt for ({username}): {error.Message}");

                return this.UnprocessableEntity(error);
            }

            await this.userService.UpdateUserPassword(user, changePasswordRequest.NewPassword);

            return this.Ok();
        }

        private ErrorResponse GetValidationError(PasswordValidationResult validationResult)
        {
            return validationResult switch
            {
                PasswordValidationResult.NewPasswordMatch => new ErrorResponse
                {
                    ErrorCode = ErrorCodes.NewPasswordSameAsOld,
                    Message = "New Password matches previous password.",
                },

                PasswordValidationResult.RequirementsNotMet => new ErrorResponse
                {
                    ErrorCode = ErrorCodes.PasswordComplexityNotMet,
                    Message = "The password complexity Requirements are not met.",
                },

                _ => new ErrorResponse
                {
                    ErrorCode = ErrorCodes.UnknownError,
                    Message = "Unknown Error.",
                },
            };
        }
    }
}
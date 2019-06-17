namespace Legion.Controllers
{
    using System;
    using System.IdentityModel.Tokens.Jwt;
    using System.Linq;
    using System.Net.Http;
    using System.Security.Claims;
    using System.Text;
    using System.Threading.Tasks;

    using Legion.Attributes;
    using Legion.Configuration;
    using Legion.Models;
    using Legion.Models.Account;
    using Legion.Services;

    using Microsoft.AspNetCore.Authentication;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;
    using Microsoft.Extensions.Options;
    using Microsoft.IdentityModel.Tokens;

    [SecurityHeaders]
    [Authorize]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IUserService userService;
        private readonly ITokenService tokenService;
        private readonly ILogger<AccountController> logger;

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
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserCredentials userCredentials)
        {
            var user = await this.userService.GetAuthenticatedUserAsync(userCredentials.Username, userCredentials.Password);

            if (user == null)
            {
                this.logger.LogInformation($"Invalid Username ({userCredentials.Username}) or password");
                return this.Unauthorized();
            }

            var token = this.tokenService.GenerateToken(user);

            return this.Ok(new
            {
                user.Username,
                user.FirstName,
                user.LastName,
                Token = token,
            });
        }

        [HttpPut("changePassword")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest changePasswordRequest)
        {
            var username = this.User.Identity?.Name;

            var user = await this.userService.GetAuthenticatedUserAsync(username, changePasswordRequest.CurrentPassword);

            if (user == null)
            {
                this.logger.LogInformation($"Invalid Change Password attempt for ({username}): invalid current password.");
                return this.Conflict(new ErrorResponse { ErrorCode = ErrorCodes.InvalidCurrentPassword, Error = "Invalid Current Password." });
            }

            if (changePasswordRequest.NewPassword != changePasswordRequest.RepeatedNewPassword)
            {
                this.logger.LogInformation($"Invalid Change Password attempt for ({username}): new passwords do not match.");
                return this.UnprocessableEntity(new ErrorResponse { Error = "New Password and Repeated Password must match.", ErrorCode = ErrorCodes.MismatchedPasswords });
            }

            var validationResult = await this.userService.ValidateNewPassword(user, changePasswordRequest.NewPassword);

            if (validationResult != PasswordValidationResult.Valid)
            {
                var error = this.GetValidationError(validationResult);
                this.logger.LogInformation($"Invalid Change Password attempt for ({username}): {error.Error}");
                return this.UnprocessableEntity(error);
            }

            await this.userService.UpdateUserPassword(user, changePasswordRequest.NewPassword);

            return this.Ok();
        }

        private ErrorResponse GetValidationError(PasswordValidationResult validationResult)
        {
            switch (validationResult)
            {
                case PasswordValidationResult.NewPasswordMatch:
                    return new ErrorResponse { ErrorCode = ErrorCodes.NewPasswordSameAsOld, Error = "New Password matches previous password." };
                case PasswordValidationResult.RequirementsNotMet:
                    return new ErrorResponse { ErrorCode = ErrorCodes.PasswordComplexityNotMet, Error = "The password complexity Requirements are not met." };
            }

            return new ErrorResponse { ErrorCode = ErrorCodes.UnknownError, Error = "Unknown Error." };
        }
    }
}
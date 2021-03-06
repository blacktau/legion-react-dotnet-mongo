namespace Legion.Services
{
    using System.Threading.Tasks;

    using Legion.Models;
    using Legion.Models.Data;

    public interface IUserService
    {
        Task<User> GetAuthenticatedUserAsync(string username, string password);

        Task UpdateUserPassword(User user, string newPassword);

        Task<PasswordValidationResult> ValidateNewPassword(User user, string newPassword);

        Task<bool> IsExistingUser(string adminUsername);

        Task CreateUser(string adminUsername, string defaultAdminPassword);
    }
}
namespace Legion.Services
{
    using System.Threading.Tasks;

    using Legion.Models;

    public interface IUserService
    {
        Task<User> GetAuthenticatedUserAsync(string username, string password);

        Task UpdateUserPassword(User user, string newPassword);

        Task<PasswordValidationResult> ValidateNewPassword(User user, string newPassword);
    }
}
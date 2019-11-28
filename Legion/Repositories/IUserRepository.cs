namespace Legion.Repositories
{
    using System.Threading.Tasks;

    using Legion.Models.Data;

    public interface IUserRepository
    {
        Task AddUser(User user);

        Task UpdateUser(User user);

        Task<User> GetUserByUsername(string username);

        Task<bool> IsExistingUser(string username);

        Task<bool> IsRepositoryEmpty();
    }
}
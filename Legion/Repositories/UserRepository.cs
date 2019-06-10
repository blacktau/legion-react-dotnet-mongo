namespace Legion.Repositories
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;

    using Legion.Configuration;
    using Legion.Models;

    using MongoDB.Driver;
    using MongoDB.Driver.Linq;

    public class UserRepository : IUserRepository
    {
        private readonly IMongoCollection<User> userCollection;

        public UserRepository(IMongoDatabase mongoDatabase)
        {
            this.userCollection = mongoDatabase.GetCollection<User>(Constants.UserCollection);
        }

        public async Task AddUser(User user)
        {
            var existingUser = await this.IsExistingUser(user.Username);

            if (existingUser)
            {
                throw new Exception("User already Exists");
            }

            user.Username = user.Username.ToLower();
            await this.userCollection.InsertOneAsync(user);
        }

        public async Task UpdateUser(User user)
        {
            var existingUser = await this.IsExistingUser(user.Username);

            if (!existingUser)
            {
                throw new Exception("User does not exist");
            }

            user.Username = user.Username.ToLower();
            await this.userCollection.ReplaceOneAsync(u => u.Username == user.Username, user, new UpdateOptions { IsUpsert = true });
        }

        public async Task<User> GetUserByUsername(string username)
        {
            var sanitisedUsername = username.ToLower();
            return await this.userCollection.AsQueryable().Where(u => u.Username == sanitisedUsername).FirstOrDefaultAsync();
        }

        public async Task<bool> IsExistingUser(string username)
        {
            var sanitisedUsername = username.ToLower();
            return await this.userCollection.AsQueryable().AnyAsync(u => u.Username == sanitisedUsername);
        }

        public async Task<bool> IsRepositoryEmpty()
        {
            return await this.userCollection.AsQueryable().AnyAsync();
        }
    }
}
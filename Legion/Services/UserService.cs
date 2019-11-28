namespace Legion.Services
{
    using System;
    using System.Linq;
    using System.Security.Cryptography;
    using System.Threading.Tasks;

    using Legion.Models;
    using Legion.Models.Data;
    using Legion.Repositories;

    using Microsoft.AspNetCore.Cryptography.KeyDerivation;

    public class UserService : IUserService
    {
        private readonly IUserRepository userRepository;

        public UserService(IUserRepository userRepository) => this.userRepository = userRepository;

        public async Task UpdateUserPassword(User user, string newPassword)
        {
            this.SetUserPassword(user, newPassword);
            await this.userRepository.UpdateUser(user);
        }

        public async Task<User> GetAuthenticatedUserAsync(string username, string password)
        {
            User user = await this.userRepository.GetUserByUsername(username);

            if (user == null)
            {
                return null;
            }

            byte[] hashedPassword = this.HashPassword(password, user.PasswordSalt);

            return !user.PasswordHash.SequenceEqual(hashedPassword) ? null : user;
        }

        public Task<PasswordValidationResult> ValidateNewPassword(User user, string newPassword)
        {
            byte[] newHashedPassword = this.HashPassword(newPassword, user.PasswordSalt);

            PasswordValidationResult result = user.PasswordHash.SequenceEqual(newHashedPassword)
                ? PasswordValidationResult.NewPasswordMatch
                : PasswordValidationResult.Valid;

            return Task.FromResult(result);
        }

        public Task<bool> IsExistingUser(string username) => this.userRepository.IsExistingUser(username);

        public async Task CreateUser(string username, string password)
        {
            var user = new User
            {
                Id = Guid.NewGuid().ToString(), Username = username,
            };

            this.SetUserPassword(user, password);

            await this.userRepository.AddUser(user);
        }

        private void SetUserPassword(User user, string password)
        {
            byte[] salt = this.GenerateSalt();
            byte[] passwordHash = this.HashPassword(password, salt);
            user.PasswordHash = passwordHash;
            user.PasswordSalt = salt;
        }

        private byte[] HashPassword(string password, byte[] salt)
            => KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA512,
                iterationCount: 10000,
                numBytesRequested: 256 / 8);

        private byte[] GenerateSalt()
        {
            var salt = new byte[128 / 8];

            using (RandomNumberGenerator rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }

            return salt;
        }
    }
}
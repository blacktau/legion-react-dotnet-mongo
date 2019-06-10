namespace Legion.Services
{
    using System;
    using System.Linq;
    using System.Security.Cryptography;
    using System.Threading.Tasks;

    using Legion.Configuration;
    using Legion.Models;
    using Legion.Repositories;

    using Microsoft.AspNetCore.Cryptography.KeyDerivation;
    using Microsoft.Extensions.Options;

    public class UserService : IUserService
    {
        private readonly IUserRepository userRepository;

        public UserService(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        public async Task UpdateUserPassword(User user, string newPassword)
        {
            this.SetUserPassword(user, newPassword);
            await this.userRepository.UpdateUser(user);
        }

        public async Task<User> GetAuthenticatedUserAsync(string username, string password)
        {
            var user = await this.userRepository.GetUserByUsername(username);

            if (user == null)
            {
                return null;
            }

            var hashedPassword = this.HashPassword(password, user.PasswordSalt);

            if (!user.PasswordHash.SequenceEqual(hashedPassword))
            {
                return null;
            }

            return user;
        }

        public Task<PasswordValidationResult> ValidateNewPassword(User user, string newPassword)
        {
            var newHashedPassword = this.HashPassword(newPassword, user.PasswordSalt);
            if (user.PasswordHash.SequenceEqual(newHashedPassword))
            {
                return Task.FromResult(PasswordValidationResult.NewPasswordMatch);
            }

            return Task.FromResult(PasswordValidationResult.Valid);
        }

        private void SetUserPassword(User user, string password)
        {
            byte[] salt = this.GenerateSalt();
            byte[] passwordHash = this.HashPassword(password, salt);
            user.PasswordHash = passwordHash;
            user.PasswordSalt = salt;
        }

        private byte[] HashPassword(string password, byte[] salt)
        {
            return KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA512,
                iterationCount: 10000,
                numBytesRequested: 256 / 8);
        }

        private byte[] GenerateSalt()
        {
            byte[] salt = new byte[128 / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }

            return salt;
        }
    }
}
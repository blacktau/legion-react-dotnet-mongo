namespace Legion.Services
{
    using System;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using Legion.Configuration;
    using Legion.Models;
    using Microsoft.Extensions.Options;
    using Microsoft.IdentityModel.Tokens;

    public class TokenService : ITokenService
    {
        private AuthenticationOptions authenticationOptions;

        public TokenService(IOptionsMonitor<AuthenticationOptions> authenticationOptionsMonitor)
        {
            this.authenticationOptions = authenticationOptionsMonitor.CurrentValue;
            authenticationOptionsMonitor.OnChange((newOptions) => this.authenticationOptions = newOptions);
        }

        public string GenerateToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = this.CreateTokenDescriptor(user);
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private SecurityTokenDescriptor CreateTokenDescriptor(User user)
        {
            return new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim(ClaimTypes.Name, user.Id),
                    }),
                Expires = DateTime.UtcNow.AddDays(this.authenticationOptions.ClaimExpiryDays),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(this.authenticationOptions.TokenSecretBytes), SecurityAlgorithms.HmacSha256Signature),
            };
        }
    }
}
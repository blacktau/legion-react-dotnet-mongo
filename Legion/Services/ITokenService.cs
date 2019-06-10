using Legion.Models;

namespace Legion.Services
{
    public interface ITokenService
    {
        string GenerateToken(User user);
    }
}
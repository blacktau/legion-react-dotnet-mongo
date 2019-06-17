namespace Legion.Services
{
    using Legion.Models;

    public interface ITokenService
    {
        string GenerateToken(User user);
    }
}
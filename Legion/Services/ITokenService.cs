namespace Legion.Services
{
    using Legion.Models.Data;

    public interface ITokenService
    {
        string GenerateToken(User user);
    }
}
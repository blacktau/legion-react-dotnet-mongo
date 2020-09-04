namespace Legion.Configuration
{
    using System.Text;

    public class AuthenticationOptions
    {
        public const string SectionName = "Authentication";

        public string TokenSecret { get; set; }

        public double ClaimExpiryDays { get; set; } = 1;

        public string DefaultAdminPassword { get; set; }
    }
}
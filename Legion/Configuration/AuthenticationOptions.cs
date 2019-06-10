namespace Legion.Configuration
{
    using System.Text;

    public class AuthenticationOptions
    {
        public string TokenSecret { get; set; }

        public byte[] TokenSecretBytes => Encoding.UTF8.GetBytes(this.TokenSecret);

        public double ClaimExpiryDays { get; internal set; }
    }
}
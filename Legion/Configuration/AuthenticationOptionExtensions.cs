namespace Legion.Configuration
{
    using System;
    using System.Text;

    public static class AuthenticationOptionExtensions
    {
        public static byte[] GetTokenSecretBytes(this AuthenticationOptions options)
        {
            if (string.IsNullOrWhiteSpace(options?.TokenSecret))
            {
                throw new Exception("Authentication.Token must be provided");
            }

            return Encoding.UTF8.GetBytes(options.TokenSecret);
        }
    }
}
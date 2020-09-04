namespace Legion.Configuration.DotEnv
{
    using System;

    using Microsoft.Extensions.Configuration;

    public class DotEnvConfigurationSource : FileConfigurationSource
    {
        public string Prefix { get; set; }

        public override IConfigurationProvider Build(IConfigurationBuilder builder)
        {
            this.EnsureDefaults(builder);
            return new DotEnvConfigurationProvider(this, this.Prefix);
        }
    }
}
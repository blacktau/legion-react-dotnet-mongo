namespace Legion.Configuration.DotEnv
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Runtime.CompilerServices;

    using Microsoft.Extensions.Configuration;

    public class DotEnvConfigurationProvider : FileConfigurationProvider
    {
        private readonly string prefix;

        public DotEnvConfigurationProvider(FileConfigurationSource source)
            : this(source, string.Empty)
        {
        }

        public DotEnvConfigurationProvider(FileConfigurationSource source, string prefix)
            : base(source)
            => this.prefix = prefix;

        public override void Load(Stream stream)
        {
            var data = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);

            using var reader = new StreamReader(stream);
            while (!reader.EndOfStream)
            {
                var line = reader.ReadLine();

                if (this.IsIgnoredLine(line))
                {
                    continue;
                }

                var varName = this.NormalizeKey(line.Substring(0, line.IndexOf('=')));
                var value = line.Substring(line.IndexOf('=')+1);

                data[varName] = value;
            }

            this.Data = data;
        }

        private string NormalizeKey(string key) => 
            key.Substring(this.prefix.Length).Replace("__", ConfigurationPath.KeyDelimiter);

        private bool IsIgnoredLine(string line) => 
            string.IsNullOrWhiteSpace(line) ||
            line.StartsWith("#") ||
            !line.Contains("=") ||
            (!string.IsNullOrEmpty(this.prefix) &&
                !line.StartsWith(this.prefix, StringComparison.OrdinalIgnoreCase));
    }
}
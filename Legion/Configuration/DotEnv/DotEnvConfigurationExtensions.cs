namespace Legion.Configuration.DotEnv
{
    using System;
    using System.IO;

    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.FileProviders;
    using Microsoft.Extensions.FileProviders.Physical;

    public static class DotEnvConfigurationExtensions
    {
        public static IConfigurationBuilder AddDotEnvFile(this IConfigurationBuilder builder) =>
            AddDotEnvFile(builder, provider: null, prefix: null, path: null, optional: false, reloadOnChange: false);

        public static IConfigurationBuilder AddDotEnvFile(this IConfigurationBuilder builder, string prefix) =>
            AddDotEnvFile(builder, provider: null, prefix: prefix, path: null, optional: false, reloadOnChange: false);

        public static IConfigurationBuilder AddDotEnvFile(this IConfigurationBuilder builder, string prefix, string path) =>
            AddDotEnvFile(builder, provider: null, prefix: prefix, path: path,  optional: false, reloadOnChange: false);

        public static IConfigurationBuilder AddDotEnvFile(this IConfigurationBuilder builder, string prefix, string path, bool optional) =>
            AddDotEnvFile(builder, provider: null, prefix: prefix, path: path, optional: optional, reloadOnChange: false);

        public static IConfigurationBuilder AddDotEnvFile(this IConfigurationBuilder builder, string prefix, string path, bool optional, bool reloadOnChange) =>
            AddDotEnvFile(builder, provider: null, prefix: prefix, path: path, optional: optional, reloadOnChange: reloadOnChange);

        public static IConfigurationBuilder AddDotEnvFile(
            this IConfigurationBuilder builder,
            IFileProvider provider,
            string path,
            string prefix,
            bool optional,
            bool reloadOnChange)
        {
            if (builder == null)
            {
                throw new ArgumentNullException(nameof(builder));
            }

            if (string.IsNullOrWhiteSpace(path))
            {
                path = ".env";
            }

            if (provider == null && !Path.IsPathRooted(path))
            {
                provider = new PhysicalFileProvider(AppContext.BaseDirectory, ExclusionFilters.System);
            }

            var source = new DotEnvConfigurationSource
            {
                FileProvider = provider,
                Path = path,
                Optional = optional,
                Prefix = prefix,
                ReloadOnChange = reloadOnChange,
            };

            source.ResolveFileProvider();

            return builder.Add(source);

            return builder.AddDotEnvFile(
                s =>
                {
                    s.FileProvider = provider;
                    s.Path = path;
                    s.Optional = optional;
                    s.ReloadOnChange = reloadOnChange;
                    s.Prefix = prefix;
                    s.ResolveFileProvider();
                });
        }

        public static IConfigurationBuilder AddDotEnvFile(this IConfigurationBuilder builder, Action<DotEnvConfigurationSource> configureSource)
            => builder.Add(configureSource);
    }
}
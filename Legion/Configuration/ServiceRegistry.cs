namespace Legion.Configuration
{
    using Legion.ImageResolvers;
    using Legion.Repositories;
    using Legion.Services;

    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Hosting;
    using Microsoft.Extensions.Options;

    using SixLabors.ImageSharp.Web;
    using SixLabors.ImageSharp.Web.Caching;
    using SixLabors.ImageSharp.Web.Commands;
    using SixLabors.ImageSharp.Web.DependencyInjection;
    using SixLabors.ImageSharp.Web.Middleware;
    using SixLabors.ImageSharp.Web.Processors;

    using IHostingEnvironment = Microsoft.AspNetCore.Hosting.IHostingEnvironment;

    internal static class ServiceRegistry
    {
        public static IServiceCollection AddLegionServices(this IServiceCollection services)
            => services
                .AddSingleton<IUserRepository, UserRepository>()
                .AddSingleton<IPhotographRepository, PhotographRepository>()
                .AddSingleton<IUserService, UserService>()
                .AddSingleton<IPhotographService, PhotographService>()
                .AddSingleton<IImageMetadataExtractor, ImageMetadataExtractor>()
                .AddSingleton<IMongoDbResolverFactory, MongoDbResolverFactory>()
                .AddSingleton<ITokenService, TokenService>()
                .AddSingleton<IStartupFilter, EnsureAdminUserStartupFilter>()
                .AddSingleton<IKeywordRepository, KeywordRepository>()
                .AddSingleton<IKeywordService, KeywordService>();

        public static IServiceCollection AddLegionOptions(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<AuthenticationOptions>(configuration.GetSection(AuthenticationOptions.SectionName));

            return services;
        }

        public static IServiceCollection AddImageSharpServices(this IServiceCollection services)
        {
            services
                .AddImageSharpCore()
                .SetRequestParser<QueryCollectionRequestParser>()
                .Configure<PhysicalFileSystemCacheOptions>(
                    options =>
                    {
                        options.CacheFolder = "is-cache";
                    })
                .SetCache(
                    provider => new PhysicalFileSystemCache(
                        provider.GetRequiredService<IOptions<PhysicalFileSystemCacheOptions>>(),
                        provider.GetRequiredService<IWebHostEnvironment>(),
                        provider.GetRequiredService<IOptions<ImageSharpMiddlewareOptions>>(),
                        provider.GetRequiredService<FormatUtilities>()))
                .SetCacheHash<CacheHash>()
                .AddProvider<MongoDbImageProvider>()
                .AddProcessor<ResizeWebProcessor>()
                .AddProcessor<FormatWebProcessor>();

            return services;
        }
    }
}
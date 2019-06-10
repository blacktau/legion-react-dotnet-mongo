namespace Legion.Configuration
{
    using Legion.ImageResolvers;
    using Legion.Repositories;
    using Legion.Services;

    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Options;

    using SixLabors.ImageSharp.Web.Caching;
    using SixLabors.ImageSharp.Web.Commands;
    using SixLabors.ImageSharp.Web.DependencyInjection;
    using SixLabors.ImageSharp.Web.Middleware;
    using SixLabors.ImageSharp.Web.Processors;
    using SixLabors.Memory;

    internal static class ServiceRegistery
    {
        public static IServiceCollection AddLegionServices(this IServiceCollection services)
        {
            return services
                .AddSingleton<IUserRepository, UserRepository>()
                .AddSingleton<IPhotographRepository, PhotographRepository>()
                .AddSingleton<IUserService, UserService>()
                .AddSingleton<IPhotographService, PhotographService>()
                .AddSingleton<IImageMetadataExtractor, ImageMetadataExtractor>()
                .AddSingleton<IMongoDbResolverFactory, MongoDbResolverFactory>()
                .AddSingleton<ITokenService, TokenService>();
        }

        public static IServiceCollection AddImageSharpServices(this IServiceCollection services)
        {
            services
                .AddImageSharpCore()
                .SetRequestParser<QueryCollectionRequestParser>()
                .SetMemoryAllocatorFromMiddlewareOptions()
                .SetCache(
                    provider => new PhysicalFileSystemCache(
                                    provider.GetRequiredService<IHostingEnvironment>(),
                                    provider.GetRequiredService<MemoryAllocator>(),
                                    provider.GetRequiredService<IOptions<ImageSharpMiddlewareOptions>>())
                    {
                        Settings =
                                        {
                                            [PhysicalFileSystemCache.Folder] = PhysicalFileSystemCache.DefaultCacheFolder,
                                        },
                    })
                .SetCacheHash<CacheHash>()
                .AddProvider<MongoDbImageProvider>()
                .AddProcessor<ResizeWebProcessor>()
                .AddProcessor<FormatWebProcessor>()
                .AddProcessor<BackgroundColorWebProcessor>();

            return services;
        }
    }
}
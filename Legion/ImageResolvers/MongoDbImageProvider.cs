namespace Legion.ImageResolvers
{
    using System;
    using System.Collections.Generic;
    using System.Threading;
    using System.Threading.Tasks;

    using Legion.Models.Data;
    using Legion.Repositories;

    using Microsoft.AspNetCore.Http;

    using Microsoft.Extensions.Logging;

    using SixLabors.ImageSharp.Web.Providers;
    using SixLabors.ImageSharp.Web.Resolvers;

    public class MongoDbImageProvider : IImageProvider
    {
        private static readonly TaskFactory TaskFactory = new TaskFactory(CancellationToken.None, TaskCreationOptions.None, TaskContinuationOptions.None, TaskScheduler.Default);

        private readonly ILogger<MongoDbImageProvider> logger;

        private readonly IMongoDbResolverFactory mongoDbResolverFactory;

        private readonly IPhotographRepository photographRepository;

        private readonly Dictionary<string, bool> validCache;

        public MongoDbImageProvider(IPhotographRepository photographRepository, IMongoDbResolverFactory mongoDbResolverFactory, ILogger<MongoDbImageProvider> logger)
        {
            this.photographRepository = photographRepository;
            this.mongoDbResolverFactory = mongoDbResolverFactory;
            this.logger = logger;
            this.validCache = new Dictionary<string, bool>();
        }

        public Func<HttpContext, bool> Match { get; set; } = context => context.Request.Path.HasValue && context.Request.Path.StartsWithSegments("/images");

        public IDictionary<string, string> Settings { get; set; }

        public ProcessingBehavior ProcessingBehavior { get; } = ProcessingBehavior.All;

        public async Task<IImageResolver> GetAsync(HttpContext context)
        {
            var photoId = ExtractPhotographId(context.Request.Path);
            this.logger.LogInformation($"Resolving {photoId}");

            Photograph photograph = await this.photographRepository.GetPhotographByIdAsync(photoId);

            this.logger.LogInformation($"Got Photograph for {photoId}");

            return this.mongoDbResolverFactory.CreateResolver(photograph);
        }

        public bool IsValidRequest(HttpContext context) => RunSync(async () => await this.IsValidRequestAsync(context));

        private static string ExtractPhotographId(PathString path)
        {
            var pathString = path.ToString();
            var startIdx = pathString.LastIndexOf('/') + 1;
            var length = pathString.LastIndexOf('.') - startIdx;

            return pathString.Substring(startIdx, length).ToLower();
        }

        private static TResult RunSync<TResult>(Func<Task<TResult>> func) => TaskFactory.StartNew(func).Unwrap().GetAwaiter().GetResult();

        private async Task<bool> IsValidRequestAsync(HttpContext context)
        {
            PathString path = context.Request.Path;

            if (!path.HasValue || !path.StartsWithSegments("/images"))
            {
                return false;
            }

            var photoId = ExtractPhotographId(path);

            if (this.validCache.ContainsKey(photoId))
            {
                return this.validCache[photoId];
            }

            var isValid = await this.photographRepository.IsExistingPhotographAsync(photoId);
            this.logger.LogInformation($"IsValidRequestAsync: {photoId}: {isValid}");
            this.validCache.Add(photoId, isValid);

            return isValid;
        }
    }
}
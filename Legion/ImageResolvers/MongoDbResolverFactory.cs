namespace Legion.ImageResolvers
{
    using System.Collections.Generic;

    using Legion.Models.Data;
    using Legion.Repositories;

    using Microsoft.Extensions.Logging;

    public class MongoDbResolverFactory : IMongoDbResolverFactory
    {
        private readonly Dictionary<string, MongoDbResolver> resolverCache;
        private readonly IPhotographRepository photographRepository;
        private readonly ILoggerFactory loggerFactory;

        public MongoDbResolverFactory(IPhotographRepository photographRepository, ILoggerFactory loggerFactory)
        {
            this.photographRepository = photographRepository;
            this.loggerFactory = loggerFactory;
            this.resolverCache = new Dictionary<string, MongoDbResolver>();
        }

        public MongoDbResolver CreateResolver(Photograph photograph)
        {
            if (this.resolverCache.ContainsKey(photograph.Id))
            {
                return this.resolverCache[photograph.Id];
            }

            var resolver = new MongoDbResolver(this.photographRepository, photograph);
            this.resolverCache.Add(photograph.Id, resolver);

            return resolver;
        }
    }
}
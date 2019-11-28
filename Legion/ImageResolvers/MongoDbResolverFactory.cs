namespace Legion.ImageResolvers
{
    using Legion.Models.Data;
    using Legion.Repositories;

    using Microsoft.Extensions.Logging;

    public class MongoDbResolverFactory : IMongoDbResolverFactory
    {
        private readonly IPhotographRepository photographRepository;

        private readonly ILoggerFactory loggerFactory;

        public MongoDbResolverFactory(IPhotographRepository photographRepository, ILoggerFactory loggerFactory)
        {
            this.photographRepository = photographRepository;
            this.loggerFactory = loggerFactory;
        }

        public MongoDbResolver CreateResolver(Photograph photograph) => new MongoDbResolver(this.loggerFactory.CreateLogger<MongoDbResolver>(), this.photographRepository, photograph);
    }
}
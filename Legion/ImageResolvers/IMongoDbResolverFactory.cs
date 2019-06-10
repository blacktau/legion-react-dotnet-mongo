namespace Legion.ImageResolvers
{
    using Legion.Models;

    public interface IMongoDbResolverFactory
    {
        MongoDbResolver CreateResolver(Photograph photograph);
    }
}
namespace Legion.ImageResolvers
{
    using Legion.Models.Data;

    public interface IMongoDbResolverFactory
    {
        MongoDbResolver CreateResolver(Photograph photograph);
    }
}
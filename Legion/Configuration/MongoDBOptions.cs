namespace Legion.Configuration
{
    public class MongoDbOptions
    {
        public const string SectionName = "Mongo";

        public string ConnectionString { get; set; }

        public string DatabaseName { get; set; }

        public string WebPassword { get; set; }
    }
}
namespace Legion.Configuration
{
    public class MongoDBOptions
    {
        public const string SectionName = "Mongo";

        public string ConnectionString { get; set; }

        public string DatabaseName { get; set; }

        public string WebPassword { get; set; }
    }
}
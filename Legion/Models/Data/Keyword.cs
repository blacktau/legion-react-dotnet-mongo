namespace Legion.Models.Data
{
    using MongoDB.Bson.Serialization.Attributes;

    public class Keyword
    {
        [BsonId]
        public string Word { get; set; }

        public bool IsPublished { get; set; }

        public int Count { get; set; }
    }
}
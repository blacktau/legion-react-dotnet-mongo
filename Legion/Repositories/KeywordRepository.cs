namespace Legion.Repositories
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Legion.Configuration;
    using Legion.Models.Data;

    using MongoDB.Driver;
    using MongoDB.Driver.Linq;

    public class KeywordRepository : IKeywordRepository
    {
        private readonly IMongoCollection<Keyword> keywordCollection;

        public KeywordRepository(IMongoDatabase mongoDatabase)
        {
            this.keywordCollection = mongoDatabase.GetCollection<Keyword>(Constants.KeywordCollection);
        }

        public async Task<List<Keyword>> GetAllKeywordsAsync() => await this.keywordCollection.AsQueryable().OrderBy(_ => _.Word).ToListAsync();

        public async Task<List<Keyword>> GetPublishedKeywordsAsync() => await this.keywordCollection.AsQueryable().Where((k) => k.IsPublished).ToListAsync();

        public async Task AddKeywordsAsync(IEnumerable<Keyword> keywords)
        {
            foreach (var keyword in keywords)
            {
                await this.keywordCollection.ReplaceOneAsync(
                    k => k.Word == keyword.Word,
                    keyword,
                    new ReplaceOptions
                    {
                        IsUpsert = true,
                    });
            }
        }
    }
}
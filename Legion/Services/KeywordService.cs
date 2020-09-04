namespace Legion.Services
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Legion.Models.Data;
    using Legion.Repositories;

    public class KeywordService : IKeywordService
    {
        private readonly IKeywordRepository keywordRepository;

        public KeywordService(IKeywordRepository keywordRepository)
        {
            this.keywordRepository = keywordRepository;
        }

        public Task<List<Keyword>> GetAllKeywords() => this.keywordRepository.GetAllKeywordsAsync();
    }
}
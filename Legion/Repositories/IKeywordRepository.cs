namespace Legion.Repositories
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Legion.Models.Data;

    public interface IKeywordRepository
    {
        Task<List<Keyword>> GetAllKeywordsAsync();

        Task<List<Keyword>> GetPublishedKeywordsAsync();

        Task AddKeywordsAsync(IEnumerable<Keyword> keywords);
    }
}
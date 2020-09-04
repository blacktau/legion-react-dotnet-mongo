namespace Legion.Services
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Legion.Models.Data;

    public interface IKeywordService
    {
        Task<List<Keyword>> GetAllKeywords();
    }
}
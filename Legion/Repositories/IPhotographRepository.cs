namespace Legion.Repositories
{
    using System.Collections.Generic;
    using System.IO;
    using System.Threading.Tasks;

    using Legion.Models;

    public interface IPhotographRepository
    {
        Task AddPhotographAsync(Photograph photograph);

        Task<List<Photograph>> GetAllAsync();

        Task<Photograph> GetPhotographByIdAsync(string id);

        Task<string> SaveImageAsync(string fileName, Photograph photograph, string contentType);

        Task<bool> IsExistingPhotographAsync(Photograph photograph);

        Task<bool> IsExistingPhotographAsync(string photographId);

        Task<Stream> ReadImageAsStreamAsync(string photoId);

        Task<int> GetPhotographsCount();

        Task<List<Photograph>> GetPublishedAsync();
    }
}
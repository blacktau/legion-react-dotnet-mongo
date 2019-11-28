namespace Legion.Services
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Legion.Models.Data;

    public interface IPhotographService
    {
        Task<List<Photograph>> GetAll();

        Task<Photograph> GetPhotographByIdAsync(string id);

        Task AddPhotographAsync(string filePath, string originalFileName);

        Task UpdatePhotograph(string id, Photograph photograph);

        Task<List<Photograph>> GetPublished();

        Task<Photograph> PublishPhotograph(string id);

        Task<Photograph> RetractPhotograph(string id);
    }
}
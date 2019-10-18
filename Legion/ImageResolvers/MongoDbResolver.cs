namespace Legion.ImageResolvers
{
    using System;
    using System.IO;
    using System.Threading.Tasks;
    using Legion.Models;
    using Legion.Repositories;
    using Microsoft.Extensions.Logging;
    using SixLabors.ImageSharp.Web;
    using SixLabors.ImageSharp.Web.Resolvers;

    public class MongoDbResolver : IImageResolver
    {
        private readonly Photograph photograph;

        private readonly ILogger<MongoDbResolver> logger;

        private readonly IPhotographRepository photographRepository;

        public MongoDbResolver(ILogger<MongoDbResolver> logger, IPhotographRepository photographRepository, Photograph photograph)
        {
            this.logger = logger;
            this.photographRepository = photographRepository;
            this.photograph = photograph;
        }

        public Task<DateTime> GetLastWriteTimeUtcAsync()
        {
            var date = this.photograph.PublishedDate ?? DateTime.UtcNow;

            return Task.FromResult(date.ToUniversalTime());
        }

        public async Task<ImageMetaData> GetMetaDataAsync()
        {
            using (var stream = await this.OpenReadAsync())
            {
                return await ImageMetaData.ReadAsync(stream);
            }
        }

        public async Task<Stream> OpenReadAsync()
        {
            return await this.photographRepository.ReadImageAsStreamAsync(this.photograph.FileId);
        }
    }
}
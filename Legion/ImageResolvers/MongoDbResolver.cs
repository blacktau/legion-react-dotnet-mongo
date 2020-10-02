namespace Legion.ImageResolvers
{
    using System;
    using System.IO;
    using System.Threading.Tasks;

    using Legion.Models.Data;
    using Legion.Repositories;

    using Microsoft.Extensions.Logging;

    using SixLabors.ImageSharp.Web;
    using SixLabors.ImageSharp.Web.Resolvers;

    public class MongoDbResolver : IImageResolver
    {
        private readonly Photograph photograph;
        private readonly ILogger<MongoDbResolver> logger;

        private readonly IPhotographRepository photographRepository;

        private ImageMetadata? imageMetaData;

        public MongoDbResolver(IPhotographRepository photographRepository, Photograph photograph, ILogger<MongoDbResolver> logger)
        {
            this.photographRepository = photographRepository;
            this.photograph = photograph;
            this.logger = logger;
        }

        public Task<ImageMetadata> GetMetaDataAsync()
        {
            this.logger.LogInformation($"[{this.photograph.Id}] GetMetaDataAsync");
            if (this.imageMetaData.HasValue)
            {
                return Task.FromResult(this.imageMetaData.Value);
            }

            this.imageMetaData = new ImageMetadata(this.photograph.UploadedDate, TimeSpan.MaxValue, this.photograph.ByteSize);

            return Task.FromResult(this.imageMetaData.GetValueOrDefault());
        }

        public async Task<Stream> OpenReadAsync()
        {
            this.logger.LogInformation($"[{this.photograph.Id}] OpenReadAsync");
            return await this.photographRepository.ReadImageAsStreamAsync(this.photograph.FileId);
        }
    }
}
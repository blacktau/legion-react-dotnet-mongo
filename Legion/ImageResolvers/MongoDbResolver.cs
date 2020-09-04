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

        private readonly IPhotographRepository photographRepository;

        // private readonly string key = DateTime.Now.Ticks.ToString();
        // private readonly ILogger<MongoDbResolver> logger;
        private ImageMetadata? imageMetaData;

        public MongoDbResolver(IPhotographRepository photographRepository, Photograph photograph)
        {
            this.photographRepository = photographRepository;
            this.photograph = photograph;
            //this.logger = loggerFactory.CreateLogger<MongoDbResolver>();
        }

        public async Task<ImageMetadata> GetMetaDataAsync()
        {
            if (this.imageMetaData.HasValue)
            {
                return this.imageMetaData.Value;
            }

            this.imageMetaData = new ImageMetadata(this.photograph.UploadedDate.Value, TimeSpan.FromHours(1));

            return this.imageMetaData.GetValueOrDefault();
        }

        public async Task<Stream> OpenReadAsync() => await this.photographRepository.ReadImageAsStreamAsync(this.photograph.FileId);
    }
}
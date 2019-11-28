namespace Legion.Repositories
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Threading.Tasks;

    using Legion.Configuration;
    using Legion.Models.Data;

    using MongoDB.Bson;
    using MongoDB.Driver;
    using MongoDB.Driver.GridFS;
    using MongoDB.Driver.Linq;

    public class PhotographRepository : IPhotographRepository
    {
        private readonly IMongoCollection<Photograph> photographCollection;

        private readonly GridFSBucket photographsBucket;

        public PhotographRepository(IMongoDatabase mongoDatabase)
        {
            this.photographCollection = mongoDatabase.GetCollection<Photograph>(Constants.PhotographCollection);

            this.photographsBucket = new GridFSBucket(
                mongoDatabase,
                new GridFSBucketOptions
                {
                    BucketName = Constants.PhotographBucketName, ChunkSizeBytes = 262144, // 256kb
                });
        }

        public async Task AddPhotographAsync(Photograph photograph)
        {
            var photographExists = await this.IsExistingPhotographAsync(photograph);

            if (photographExists)
            {
                throw new Exception("Photograph already exists");
            }

            await this.photographCollection.InsertOneAsync(photograph);
        }

        public async Task<List<Photograph>> GetAllAsync() => await this.photographCollection.AsQueryable().OrderBy(_ => _.UploadedDate).ToListAsync();

        public async Task<List<Photograph>> GetPublishedAsync() => await this.photographCollection.AsQueryable().Where(p => p.IsPublished).OrderBy(_ => _.PublishedDate).ToListAsync();

        public async Task UpdatePhotographAsync(Photograph photograph)
        {
            var photographExists = await this.IsExistingPhotographAsync(photograph);

            if (!photographExists)
            {
                throw new FileNotFoundException();
            }

            await this.photographCollection.FindOneAndReplaceAsync(p => p.Id == photograph.Id, photograph);
        }

        public async Task<Stream> ReadImageAsStreamAsync(string fileId)
        {
            ObjectId id = ObjectId.Parse(fileId);

            return await this.photographsBucket.OpenDownloadStreamAsync(id);
        }

        public async Task<Photograph> GetPhotographByIdAsync(string id) => await this.photographCollection.AsQueryable().FirstOrDefaultAsync(p => p.Id == id);

        public async Task<bool> IsExistingPhotographAsync(Photograph photograph) => await this.IsExistingPhotographAsync(photograph.Id);

        public async Task<bool> IsExistingPhotographAsync(string photographId) => await this.photographCollection.AsQueryable().AnyAsync(p => p.Id == photographId);

        public async Task<string> SaveImageAsync(string fileName, Photograph photograph, string contentType)
        {
            if (!File.Exists(fileName))
            {
                throw new FileNotFoundException($"Failed to find file {fileName}", fileName);
            }

            await using (FileStream stream = File.OpenRead(fileName))
            {
                var uploadOptions = new GridFSUploadOptions
                {
                    Metadata = new BsonDocument(
                        new Dictionary<string, object>
                        {
                            {
                                "PhotographId", photograph.Id
                            },
                            {
                                "ContentType", contentType
                            },
                        }),
                };

                ObjectId id = await this.photographsBucket.UploadFromStreamAsync(fileName, stream, uploadOptions);

                return id.ToString();
            }
        }

        public Task<int> GetPhotographsCount() => this.photographCollection.AsQueryable().CountAsync();
    }
}
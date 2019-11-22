namespace Legion.Services
{
    using System;
    using System.Collections.Generic;
    using System.Text.RegularExpressions;
    using System.Threading.Tasks;

    using Legion.Models;
    using Legion.Repositories;

    public class PhotographService : IPhotographService
    {
        private readonly Regex idRegex = new Regex(@"\W+");

        private readonly IPhotographRepository photographRepository;

        private readonly IImageMetadataExtractor imageMetadataExtractor;

        public PhotographService(IPhotographRepository photographRepository, IImageMetadataExtractor imageMetadataExtractor)
        {
            this.photographRepository = photographRepository;
            this.imageMetadataExtractor = imageMetadataExtractor;
        }

        public async Task AddPhotographAsync(string filePath, string originalFileName)
        {
            var metaData = this.imageMetadataExtractor.ExtractMetadata(filePath);

            if (string.IsNullOrWhiteSpace(metaData.ObjectName))
            {
                metaData.ObjectName = originalFileName;
            }

            var keywords = this.ParseKeywords(metaData.Keywords);

            var id = await this.CreatePhotographId(metaData.ObjectName);

            var photograph = new Photograph
            {
                Id = id,
                Description = metaData.Caption,
                Title = metaData.ObjectName,
                DateTimeOriginal = metaData.DateTimeOriginal,
                DateTimeDigitized = metaData.DateTimeDigitized,
                Keywords = keywords,
                ExposureProgram = metaData.ExposureProgram,
                ExposureTime = metaData.ExposureTime,
                FNumber = metaData.FNumber,
                IsoSpeed = metaData.IsoSpeed,
                UploadedDate = DateTime.Now,
            };

            photograph.FileId = await this.photographRepository.SaveImageAsync(filePath, photograph, metaData.ContentType);

            await this.photographRepository.AddPhotographAsync(photograph);
        }

        public Task<List<Photograph>> GetAll()
        {
            return this.photographRepository.GetAllAsync();
        }

        public Task<List<Photograph>> GetPublished()
        {
            return this.photographRepository.GetPublishedAsync();
        }

        public async Task<Photograph> GetPhotographByIdAsync(string id)
        {
            return await this.photographRepository.GetPhotographByIdAsync(id);
        }

        public Task UpdatePhotograph(string id, Photograph photograph)
        {
            throw new System.NotImplementedException();
        }

        private async Task<string> CreatePhotographId(string title, int next = 1)
        {
            string idTitle = title.ToLowerInvariant();
            string id = this.idRegex.Replace(idTitle, "-");
            if (!(await this.photographRepository.IsExistingPhotographAsync(id)))
            {
                return id;
            }

            string nextTitle = $"{title} {next}";
            return await this.CreatePhotographId(nextTitle, next++);
        }

        private List<string> ParseKeywords(string keywordList)
        {
            if (string.IsNullOrWhiteSpace(keywordList))
            {
                return null;
            }

            return new List<string>(keywordList.ToLower().Split(';'));
        }
    }
}
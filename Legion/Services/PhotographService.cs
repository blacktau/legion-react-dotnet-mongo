namespace Legion.Services
{
    using System;
    using System.Collections.Generic;
    using System.Text.RegularExpressions;
    using System.Threading.Tasks;

    using Legion.Models;
    using Legion.Models.Data;
    using Legion.Repositories;

    public class PhotographService : IPhotographService
    {
        private readonly Regex idRegex = new Regex(@"\W+");

        private readonly IPhotographRepository photographRepository;

        private readonly IImageMetadataExtractor imageMetadataExtractor;

        public PhotographService(
            IPhotographRepository photographRepository,
            IImageMetadataExtractor imageMetadataExtractor)
        {
            this.photographRepository = photographRepository;
            this.imageMetadataExtractor = imageMetadataExtractor;
        }

        public async Task AddPhotographAsync(string filePath, string originalFileName)
        {
            ImageMetadata metaData = this.imageMetadataExtractor.ExtractMetadata(filePath);

            if (string.IsNullOrWhiteSpace(metaData.ObjectName))
            {
                metaData.ObjectName = originalFileName;
            }

            var id = await this.CreatePhotographId(metaData.ObjectName);

            var photograph = new Photograph
            {
                Id = id,
                Description = metaData.Caption,
                Title = metaData.ObjectName,
                DateTimeOriginal = metaData.DateTimeOriginal,
                DateTimeDigitized = metaData.DateTimeDigitized,
                Keywords = metaData.Keywords,
                ExposureProgram = metaData.ExposureProgram,
                ExposureTime = metaData.ExposureTime,
                FNumber = metaData.FNumber,
                IsoSpeed = metaData.IsoSpeed,
                UploadedDate = DateTime.Now,
                Width = metaData.Width,
                Height = metaData.Height,
                Ratio = metaData.Width / (decimal)metaData.Height,
            };

            photograph.FileId = await this.photographRepository.SaveImageAsync(filePath, photograph, metaData.ContentType);

            await this.photographRepository.AddPhotographAsync(photograph);
        }

        public Task<List<Photograph>> GetAll() => this.photographRepository.GetAllAsync();

        public Task<List<Photograph>> GetPublished() => this.photographRepository.GetPublishedAsync();

        public async Task<Photograph> PublishPhotograph(string id)
        {
            Photograph photograph = await this.photographRepository.GetPhotographByIdAsync(id);

            if (photograph == null)
            {
                return null;
            }

            photograph.IsPublished = true;
            photograph.PublishedDate = DateTime.Now;
            await this.photographRepository.UpdatePhotographAsync(photograph);

            return photograph;
        }

        public async Task<Photograph> RetractPhotograph(string id)
        {
            Photograph photograph = await this.photographRepository.GetPhotographByIdAsync(id);

            if (photograph == null)
            {
                return null;
            }

            photograph.IsPublished = false;
            photograph.PublishedDate = null;
            await this.photographRepository.UpdatePhotographAsync(photograph);

            return photograph;
        }

        public Task<List<KeywordModel>> GetAllKeywords() => this.photographRepository.GetAllKeywords();

        public async Task<Photograph> GetPhotographByIdAsync(string id) => await this.photographRepository.GetPhotographByIdAsync(id);

        public async Task UpdatePhotograph(string id, Photograph photograph)
        {
            Photograph original = await this.GetPhotographByIdAsync(id);
            original.Description = photograph.Description;
            original.Title = photograph.Title;
            original.Keywords = photograph.Keywords;
            await this.photographRepository.UpdatePhotographAsync(original);
        }

        private static List<string> ParseKeywords(string keywordList)
            => string.IsNullOrWhiteSpace(keywordList)
                ? null
                : new List<string>(keywordList.ToLower().Split(';'));

        private async Task<string> CreatePhotographId(string title, int next = 1)
        {
            var idTitle = title.ToLowerInvariant();
            var id = this.idRegex.Replace(idTitle, "-");

            if (!(await this.photographRepository.IsExistingPhotographAsync(id)))
            {
                return id;
            }

            var nextTitle = $"{title} {next}";

            return await this.CreatePhotographId(nextTitle, ++next);
        }
    }
}
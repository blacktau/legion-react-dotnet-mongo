namespace Legion.Models.Data
{
    using System;
    using System.Collections.Generic;

    public class Photograph
    {
        public string Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public DateTime? DateTimeOriginal { get; set; }

        public DateTime? DateTimeDigitized { get; set; }

        public string ExposureTime { get; set; }

        public string FNumber { get; set; }

        public string ExposureProgram { get; set; }

        public string IsoSpeed { get; set; }

        public IList<string> Keywords { get; set; }

        public string FileId { get; set; }

        public bool IsPublished { get; set; }

        public DateTime? PublishedDate { get; set; }

        public DateTime? UploadedDate { get; set; }

        public int Width { get; set; }

        public int Height { get; set; }

        public decimal Ratio { get; set; }
    }
}
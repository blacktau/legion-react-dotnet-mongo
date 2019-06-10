namespace Legion.Models
{
    using System;

    public class ImageMetadata
    {
        public int Width { get; set; }

        public int Height { get; set; }

        public string ExposureTime { get; set; }

        public string FNumber { get; set; }

        public string ExposureProgram { get; set; }

        public string IsoSpeed { get; set; }

        public DateTime? DateTimeOriginal { get; set; }

        public DateTime? DateTimeDigitized { get; set; }

        public string ObjectName { get; set; }

        public string Keywords { get; set; }

        public string Caption { get; set; }

        public string ContentType { get; internal set; }
    }
}
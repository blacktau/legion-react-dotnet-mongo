using System.IO;

namespace Legion.Services
{
    using System.Collections.Generic;
    using System.Linq;
    using Legion.Extensions;
    using Legion.Models;

    using MetadataExtractor;
    using MetadataExtractor.Formats.Exif;
    using MetadataExtractor.Formats.Iptc;
    using MetadataExtractor.Formats.Jpeg;
    using MetadataExtractor.Util;

    public class ImageMetadataExtractor : IImageMetadataExtractor
    {
        public ImageMetadata ExtractMetadata(string filePath)
        {
            FileType fileType;

            using (FileStream stream = System.IO.File.OpenRead(filePath))
            {
                fileType = MetadataExtractor.Util.FileTypeDetector.DetectFileType(stream);
            }

            IEnumerable<Directory> directories = ImageMetadataReader.ReadMetadata(filePath);

            var metaData = new ImageMetadata();

            SetJpegProperties(directories, metaData);
            SetExifSubIFDProperties(directories, metaData);
            SetIPTCProperties(directories, metaData);

            metaData.ContentType = GetContentType(fileType);

            return metaData;
        }

        private static string GetContentType(FileType fileType)
        {
            switch (fileType)
            {
                case FileType.Jpeg:
                    return "image/jpeg";

                default:
                    return string.Empty;
            }
        }

        private static void SetExifSubIFDProperties(IEnumerable<Directory> directories, ImageMetadata metaData)
        {
            var directory = directories.OfType<ExifSubIfdDirectory>().FirstOrDefault();
            if (directory == null)
            {
                return;
            }

            metaData.ExposureTime = directory.GetString(ExifDirectoryBase.TagExposureTime);
            metaData.FNumber = directory.GetString(ExifDirectoryBase.TagFNumber);
            metaData.ExposureProgram = directory.GetString(ExifDirectoryBase.TagExposureProgram);
            metaData.IsoSpeed = directory.GetString(ExifDirectoryBase.TagIsoEquivalent);
            metaData.DateTimeOriginal = directory.GetNullableDateTime(ExifDirectoryBase.TagDateTimeOriginal);
            metaData.DateTimeDigitized = directory.GetNullableDateTime(ExifDirectoryBase.TagDateTimeDigitized);
        }

        private static void SetIPTCProperties(IEnumerable<Directory> directories, ImageMetadata metaData)
        {
            var directory = directories.OfType<IptcDirectory>().FirstOrDefault();
            if (directory == null)
            {
                return;
            }

            metaData.ObjectName = directory.GetString(IptcDirectory.TagObjectName);
            metaData.Keywords = directory.GetString(IptcDirectory.TagKeywords);
            metaData.Caption = directory.GetString(IptcDirectory.TagCaption);
        }

        private static void SetJpegProperties(IEnumerable<Directory> directories, ImageMetadata metaData)
        {
            var directory = directories.OfType<JpegDirectory>().FirstOrDefault();
            if (directory == null)
            {
                return;
            }

            metaData.Width = directory.GetImageWidth();
            metaData.Height = directory.GetImageHeight();
        }
    }
}
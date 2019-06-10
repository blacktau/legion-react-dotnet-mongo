namespace Legion.Services
{
    using Legion.Models;

    public interface IImageMetadataExtractor
    {
        ImageMetadata ExtractMetadata(string filePath);
    }
}
namespace Legion.Extensions
{
    using System;

    using MetadataExtractor;

    public static class DirectoryExtensions
    {
        public static DateTime? GetNullableDateTime(this Directory directory, int valueId)
        {
            try
            {
                return directory.GetDateTime(valueId);
            }
            catch (MetadataException)
            {
                return null;
            }
        }
    }
}
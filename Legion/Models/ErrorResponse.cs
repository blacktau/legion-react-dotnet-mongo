namespace Legion.Models
{
    public class ErrorResponse
    {
        public string Message { get; set; }

        public ErrorCodes ErrorCode { get; set; }
    }
}
namespace Legion.Models
{
    public enum ErrorCodes
    {
        UnknownError,
        InvalidCurrentPassword,
        MismatchedPasswords,
        NewPasswordSameAsOld,
        PasswordComplexityNotMet,
    }
}
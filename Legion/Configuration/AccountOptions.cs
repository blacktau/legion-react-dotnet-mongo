namespace Legion.Configuration
{
    using System;

    public class AccountOptions
    {
        public bool AllowRememberLogin { get; set; }

        public bool AllowLocalLogin { get; set; }

        public TimeSpan RememberMeLoginDuration { get; set; }
    }
}
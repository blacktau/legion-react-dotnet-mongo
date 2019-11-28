namespace Legion.Configuration
{
    using System;

    using Legion.Services;

    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Options;

    public class EnsureAdminUserStartupFilter : IStartupFilter
    {
        private readonly IServiceProvider serviceProvider;

        public EnsureAdminUserStartupFilter(IServiceProvider serviceProvider)
        {
            this.serviceProvider = serviceProvider;
        }

        public Action<IApplicationBuilder> Configure(Action<IApplicationBuilder> next)
        {
            using (var scope = this.serviceProvider.CreateScope())
            {
                var userService = scope.ServiceProvider.GetRequiredService<IUserService>();
                var options = scope.ServiceProvider.GetRequiredService<IOptionsMonitor<AuthenticationOptions>>().CurrentValue;

                var adminUserExists = userService.IsExistingUser(Constants.AdminUsername)
                    .GetAwaiter()
                    .GetResult();

                if (!adminUserExists)
                {
                    userService.CreateUser(Constants.AdminUsername, options.DefaultAdminPassword)
                        .GetAwaiter()
                        .GetResult();
                }
            }

            return next;
        }
    }
}
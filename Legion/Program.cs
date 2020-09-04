namespace Legion
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Threading.Tasks;

    using Legion.Configuration.DotEnv;

    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.Hosting;
    using Microsoft.Extensions.Logging;

    public class Program
    {
        public static void Main(string[] args) => CreateHostBuilder(args).Build().Run();

        private static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>()
                        .ConfigureAppConfiguration(
                            (context, builder) =>
                            {
                                if (context.HostingEnvironment.IsDevelopment())
                                {
                                    builder.AddDotEnvFile(prefix: "LEGION_");

                                    if (string.IsNullOrWhiteSpace(context.HostingEnvironment.WebRootPath))
                                    {
                                        context.HostingEnvironment.WebRootPath = Path.Combine(
                                            AppContext.BaseDirectory,
                                            "wwwroot");
                                    }
                                }

                                builder.AddEnvironmentVariables(prefix: "LEGION_");
                            });
                });
    }
}

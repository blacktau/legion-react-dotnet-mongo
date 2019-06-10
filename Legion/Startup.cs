namespace Legion
{
    using System.IdentityModel.Tokens.Jwt;
    using System.Text;

    using Legion.Configuration;

    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.HttpsPolicy;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.IdentityModel.Tokens;

    using MongoDB.Driver;

    using SixLabors.ImageSharp.Web.DependencyInjection;

    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            this.Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddImageSharpServices();

            services.AddCors();

            services.AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            services.AddOptions();

            var key = this.GetJwtKey();

            services
                .AddAuthentication(options =>
                    {
                        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                    })
                .AddJwtBearer(options =>
                    {
                        options.SaveToken = true;
                        options.TokenValidationParameters = new TokenValidationParameters
                        {
                            ValidateIssuerSigningKey = true,
                            IssuerSigningKey = new SymmetricSecurityKey(key),
                            ValidateIssuer = false,
                            ValidateAudience = false,
                        };
                    });

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            services.AddLegionServices();

            this.RegisterMongoDatabase(services);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");

                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseAuthentication();

            app.UseImageSharp();

            app.UseCors();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }

        private byte[] GetJwtKey()
        {
            var authenticationSettingsSection = this.Configuration.GetSection(nameof(AuthenticationOptions));
            var authenticationOptions = authenticationSettingsSection.Get<AuthenticationOptions>();
            return authenticationOptions.TokenSecretBytes;
        }

        private void RegisterMongoDatabase(IServiceCollection services)
        {
            services.AddSingleton(
                serviceProvider =>
                    {
                        var mongoDbOptions = this.Configuration.GetSection(nameof(MongoDBOptions));
                        var client = new MongoClient(mongoDbOptions[nameof(MongoDBOptions.ConnectionString)]);
                        return client.GetDatabase(mongoDbOptions[nameof(MongoDBOptions.DatabaseName)]);
                    });
        }
    }
}

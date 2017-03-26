﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DWx.Repository.Repository;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authentication;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace DWx.API
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAuthorization();

            var corsBuilder = new CorsPolicyBuilder();
            corsBuilder.AllowAnyHeader();
            corsBuilder.AllowAnyMethod();
            corsBuilder.WithOrigins("https://localhost:5043", "http://localhost:9876");
            corsBuilder.AllowCredentials();
            services.AddCors(options =>
            {
                options.AddPolicy("AureliaSPA", corsBuilder.Build());
            });

            // Add framework services.
            services.AddMvc();

            //DI
            services.AddSingleton<IDroidRepository, DroidRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            var signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("CD7TQJmvM4RNwYWZwfgzkHZ"));
            //var signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("1LTMzakihiRla_8z2BEJVXeWMqo"));
            
            var tokenValidationParameters = new TokenValidationParameters
            {
                //// The signing key must match!
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = signingKey,

                //// Validate the JWT Issuer (iss) claim
                ValidateIssuer = false,
                ValidIssuer = "https://login.microsoftonline.com/9188040d-6c67-4c5b-b112-36a304b66dad/v2.0",

                //// Validate the JWT Audience (aud) claim
                ValidateAudience = false,
                ValidAudience = "233b8b15-868c-4125-b954-e64ae7c8e3a8",

                // Validate the token expiry
                ValidateLifetime = true,

                // If you want to allow a certain amount of clock drift, set that here:
                ClockSkew = TimeSpan.Zero
            };

            // Configure the app to use Jwt Bearer Authentication
            app.UseJwtBearerAuthentication(new JwtBearerOptions
            {
                AutomaticAuthenticate = true,
                AutomaticChallenge = true,
                Authority = "https://login.microsoftonline.com/9188040d-6c67-4c5b-b112-36a304b66dad/v2.0",
                //Audience = "https://localhost:5043",
                TokenValidationParameters = tokenValidationParameters

            });

            app.UseCors("AureliaSPA");

            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseMvc();
        }
    }
}

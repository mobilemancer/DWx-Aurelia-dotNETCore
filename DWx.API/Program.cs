using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;

namespace DWx.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = new WebHostBuilder();
            //NOTE: Must set ASPNETCORE_ENVIRONMENT as App variable in destionation Azure container, or reading "environmnet" below will fail!!
            var environment = host.GetSetting("environment") != null ? host.GetSetting("environment") : "Production";

            var config = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile($"hosting.{environment}.json", optional: true)
                .AddJsonFile("hosting.json", optional: true)
                .Build();

            host.UseConfiguration(config);
            if (environment.ToLower() == "production")
            {
                host.UseKestrel();
            }
            else
            {
                host.UseKestrel(options =>
                {
                    options.AddServerHeader = false;
                    options.UseHttps("KestrelCert.pfx", "mobilemancer");
                });
            }
            host.UseContentRoot(Directory.GetCurrentDirectory());
            host.UseIISIntegration()
                .UseStartup<Startup>();
            host.Build().Run();
        }
    }
}

using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace DWx.Webb
{
  public class Program
  {
    public static void Main(string[] args)
    {
      var host = new WebHostBuilder()
                .UseKestrel(options => options.UseHttps("KestrelCert.pfx", "mobilemancer"))
                .UseUrls("https://localhost:5043")
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseIISIntegration()
                .UseStartup<Startup>()
                .Build();

      host.Run();
    }
  }
}

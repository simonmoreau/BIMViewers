using Microsoft.Azure.Functions.Worker.Builder;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using bimviewers_api.Services;
using Autodesk.Authentication;
using Autodesk.SDKManager;
using System.Net.Http;

var builder = FunctionsApplication.CreateBuilder(args);

builder.ConfigureFunctionsWebApplication();

// Application Insights isn't enabled by default. See https://aka.ms/AAt8mw4.
// builder.Services
//     .AddApplicationInsightsTelemetryWorkerService()
//     .ConfigureFunctionsApplicationInsights();

// Configure additional services
ConfigureServices(builder.Services);

builder.Build().Run();

// Method to configure services for dependency injection
void ConfigureServices(IServiceCollection services)
{
  SDKManager sdkManager = SdkManagerBuilder.Create().Build();
  AuthenticationClient authClient = new AuthenticationClient(sdkManager);

  services.AddSingleton<AuthenticationClient>(authClient);

  string baseAdresse = "https://api.catenda.com";
  services.AddHttpClient("CatendaClient", client =>
  {
    client.BaseAddress = new Uri(baseAdresse);
  });

  services.AddHttpClient("BIMDataClient", client =>
  {
    client.BaseAddress = new Uri("https://iam.bimdata.io");
  });


}

using Microsoft.Azure.Functions.Worker.Builder;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using bimviewers_api.Services;
using Autodesk.Authentication;
using Autodesk.SDKManager;

var builder = FunctionsApplication.CreateBuilder(args);

builder.ConfigureFunctionsWebApplication();


// Explicitly load local.settings.json
builder.Configuration.AddJsonFile("local.settings.json", optional: true, reloadOnChange: true);


// Load settings
builder.Services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));

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

}
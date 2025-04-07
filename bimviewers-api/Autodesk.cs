using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using bimviewers_api.Services;
using Autodesk.Authentication;
using Autodesk.Authentication.Model;

namespace bimviewers_api
{
    public class Autodesk
    {
        private readonly AppSettings _settings;
        private readonly ILogger<Autodesk> _logger;
        private readonly AuthenticationClient _authenticationClient;

        public Autodesk(IOptions<AppSettings> options, ILogger<Autodesk> logger,
        AuthenticationClient authenticationClient)
        {
            _authenticationClient = authenticationClient;
            _settings = options.Value;
            _logger = logger;
        }

        [Function("Autodesk")]
        public async Task<IActionResult> Run([HttpTrigger(AuthorizationLevel.Anonymous, "get", "post")] HttpRequest req)
        {
            TwoLeggedToken twoLeggedToken = await _authenticationClient.GetTwoLeggedTokenAsync(_settings.Forge.ClientId, _settings.Forge.ClientSecret, new List<Scopes> { Scopes.BucketCreate });


            _logger.LogInformation("C# HTTP trigger function processed a request.");
            return new OkObjectResult("Welcome to Azure Functions!");
        }
    }
}

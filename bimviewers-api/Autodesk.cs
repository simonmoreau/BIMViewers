using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace bimviewers_api
{
    public class Autodesk
    {
        private readonly ILogger<Autodesk> _logger;

        public Autodesk(ILogger<Autodesk> logger)
        {
            _logger = logger;
        }

        [Function("Autodesk")]
        public IActionResult Run([HttpTrigger(AuthorizationLevel.Anonymous, "get", "post")] HttpRequest req)
        {
            _logger.LogInformation("C# HTTP trigger function processed a request.");
            return new OkObjectResult("Welcome to Azure Functions!");
        }
    }
}

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
    private readonly ILogger<Autodesk> _logger;
    private readonly AuthenticationClient _authenticationClient;

    public Autodesk(ILogger<Autodesk> logger,
    AuthenticationClient authenticationClient)
    {
      _authenticationClient = authenticationClient;
      _logger = logger;
    }

    [Function("Autodesk")]
    public async Task<IActionResult> Run([HttpTrigger(AuthorizationLevel.Anonymous, "get", "post")] HttpRequest req)
    {

      _logger.LogInformation("C# HTTP trigger function processed a request.");

      string? clientID = System.Environment.GetEnvironmentVariable("ForgeClientId");
      string? clientSecret = System.Environment.GetEnvironmentVariable("ForgeClientSecret");

      TwoLeggedToken twoLeggedToken = await _authenticationClient.GetTwoLeggedTokenAsync(
          clientID, clientSecret,
          new List<Scopes> { Scopes.DataRead });

      // code:all data:write data:read bucket:create bucket:delete bucket:read

      return new OkObjectResult("Welcome to Azure Functions!");
    }
  }
}

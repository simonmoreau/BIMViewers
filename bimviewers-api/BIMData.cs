using bimviewers_api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace bimviewers_api
{
  public class BIMData
  {
    private readonly ILogger<BIMData> _logger;
    private readonly HttpClient _httpClient;

    public BIMData(ILogger<BIMData> logger, IHttpClientFactory httpClientFactory)
    {
      _logger = logger;
      _httpClient = httpClientFactory.CreateClient("BIMDataClient");
    }

    [Function("BIMData")]
    public async Task<IActionResult> Run([HttpTrigger(AuthorizationLevel.Anonymous, "get")] HttpRequest req)
    {
      _logger.LogInformation("C# HTTP trigger function processed a request.");

      string? clientID = System.Environment.GetEnvironmentVariable("BIMDataClientId");
      string? clientSecret = System.Environment.GetEnvironmentVariable("BIMDataClientSecret");

      BIMDataToken token = await RefreshAccessTokenAsync(clientID, clientSecret, req.HttpContext.RequestAborted);
      return new OkObjectResult(new CommonToken(token.access_token));

    }

    private async Task<BIMDataToken> RefreshAccessTokenAsync(string cliendId, string cientSecret, CancellationToken cancellationToken)
    {
      HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, "/auth/realms/bimdata/protocol/openid-connect/token");

      List<KeyValuePair<string, string>> collection = new List<KeyValuePair<string, string>>();
      collection.Add(new("grant_type", "client_credentials"));
      collection.Add(new("client_id", cliendId));
      collection.Add(new("client_secret", cientSecret));
      FormUrlEncodedContent content = new FormUrlEncodedContent(collection);
      request.Content = content;

      HttpResponseMessage response = await _httpClient.SendAsync(request);
      response.EnsureSuccessStatusCode();

      Stream stream = await response.Content.ReadAsStreamAsync();

      if (!stream.CanRead) throw new Exception("The stream can't be read, the token has not been refreshed.");

      JsonSerializerOptions options = new JsonSerializerOptions();
      BIMDataToken result = await JsonSerializer.DeserializeAsync<BIMDataToken>(stream, options);
      return result;
    }
  }
}

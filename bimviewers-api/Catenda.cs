using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using bimviewers_api.Services;
using Autodesk.Authentication;
using Autodesk.Authentication.Model;
using bimviewers_api.Models;
using System.Diagnostics;
using System.Text.Json;
using Azure.Data.Tables;
using System.Xml;
using System.Text;
using System.Net.Http;
using Microsoft.VisualBasic;
using System.Net.Http.Headers;
using Newtonsoft.Json.Linq;

namespace bimviewers_api
{
  public class Catenda
  {
    private readonly ILogger<Autodesk> _logger;
    private readonly HttpClient _httpClient;
    private readonly TableClient _tableClient;

    public Catenda(ILogger<Autodesk> logger, IHttpClientFactory httpClientFactory)
    {
      _logger = logger;
      _httpClient = httpClientFactory.CreateClient("CatendaClient");

      string connectionString = Environment.GetEnvironmentVariable("TableStorageConnectionString");
      _tableClient = new TableClient(connectionString, nameof(SavedToken));
      _tableClient.CreateIfNotExists(); // Ensure the table exists

    }

    [Function("Catenda")]
    public async Task<IActionResult> Run([HttpTrigger(AuthorizationLevel.Anonymous, "get")] HttpRequest req)
    {

      // Example: Retrieve data
      SavedToken savedToken = _tableClient.GetEntity<SavedToken>(nameof(SavedToken), "token_row_key");

      Token refreshedToken = await RefreshAccessTokenAsync(savedToken.RefreshToken, req.HttpContext.RequestAborted);

      savedToken.RefreshToken = refreshedToken.refresh_token;
      savedToken.AccessToken = refreshedToken.access_token;

      await _tableClient.UpdateEntityAsync(savedToken, savedToken.ETag, TableUpdateMode.Replace);

      Viewzer3dToken viewerToken = await GetViewerToken(savedToken.AccessToken, req.HttpContext.RequestAborted);

      return new OkObjectResult(new CommonToken(viewerToken.token));
    }

    private async Task<Token> RefreshAccessTokenAsync(string refresh_token, CancellationToken cancellationToken)
    {
      string path = String.Format("oauth2/token");

      string? clientID = System.Environment.GetEnvironmentVariable("CatendaClientId");
      string? clientSecret = System.Environment.GetEnvironmentVariable("CatendaClientSecret");

      List<KeyValuePair<string, string>> keyValues = new List<KeyValuePair<string, string>>();
      keyValues.Add(new KeyValuePair<string, string>("grant_type", "refresh_token"));
      keyValues.Add(new KeyValuePair<string, string>("refresh_token", refresh_token));
      keyValues.Add(new KeyValuePair<string, string>("client_id", clientID));
      keyValues.Add(new KeyValuePair<string, string>("client_secret", clientSecret));

      HttpContent httpContent = new FormUrlEncodedContent(keyValues); // = new StringContent(jsonString, Encoding.UTF8, "application/x-www-form-urlencoded");

      HttpResponseMessage response = await _httpClient.PostAsync(path, httpContent, cancellationToken); // _client.GetAsync(path);
      response.EnsureSuccessStatusCode();

      Stream stream = await response.Content.ReadAsStreamAsync();

      if (!stream.CanRead) throw new Exception("The stream can't be read, the token has not been refreshed.");

      JsonSerializerOptions options = new JsonSerializerOptions();
      Token result = await JsonSerializer.DeserializeAsync<Token>(stream, options);
      return result;
    }

    private async Task<Viewzer3dToken> GetViewerToken(string accesToken, CancellationToken cancellationToken)
    {
      string path = String.Format("/v2/projects/79d3bb6f8fbe49739311d80bd691e81b/viewer3d/token");

      // Serialize our concrete class into a JSON String
      string stringPayload = JsonSerializer.Serialize(new { revision = new string[] { "2285cfdcb05b4e4aa63314cf95447d51" } });

      // Wrap our JSON inside a StringContent which then can be used by the HttpClient class
      StringContent httpContent = new StringContent(stringPayload, Encoding.UTF8, "application/json");

      HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, path);
      request.Headers.Accept.Clear();
      request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accesToken);
      request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
      request.Content = new StringContent(stringPayload);
      request.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");


      HttpResponseMessage response = await _httpClient.SendAsync(request, cancellationToken); // _client.GetAsync(path);
      response.EnsureSuccessStatusCode();

      using (Stream stream = await response.Content.ReadAsStreamAsync())
      {
        if (!stream.CanRead) throw new Exception("The stream can't be read, the token has not been refreshed.");

        JsonSerializerOptions options = new JsonSerializerOptions();
        Viewzer3dToken result = await JsonSerializer.DeserializeAsync<Viewzer3dToken>(stream, options);
        return result;
      }

    }
  }
}

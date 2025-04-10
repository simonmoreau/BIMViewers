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

namespace bimviewers_api
{
  public class Catenda
  {
    private readonly ILogger<Autodesk> _logger;
    private readonly HttpClient _httpClient;
    private readonly TableClient _tableClient;

    public Catenda(ILogger<Autodesk> logger, HttpClient httpClient)
    {
      _logger = logger;
      _httpClient = httpClient;

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

      return new OkObjectResult(new CommonToken(savedToken.AccessToken));
    }

    private async Task<Token> RefreshAccessTokenAsync(string refresh_token, CancellationToken cancellationToken)
    {
      string path = String.Format("oauth2/token");
      string baseAdresse = "https://api.catenda.com";
      _httpClient.BaseAddress = new Uri(baseAdresse);

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
  }
}

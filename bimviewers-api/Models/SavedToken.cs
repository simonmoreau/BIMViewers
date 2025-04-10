using Azure.Data.Tables;
using Azure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace bimviewers_api.Models
{
  public class SavedToken : ITableEntity
  {
    public string PartitionKey { get; set; }
    public string RowKey { get; set; }
    public string AccessToken { get; set; }
    public string RefreshToken { get; set; }
    public ETag ETag { get; set; }
    public DateTimeOffset? Timestamp { get; set; }
  }
}

using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace bimviewers_api.Models
{
  public class BIMDataToken
  {
    public string access_token { get; set; }
    public int expires_in { get; set; }
    public int refresh_expires_in { get; set; }
    public string token_type { get; set; }

    [JsonProperty("not-before-policy")]
    public int notbeforepolicy { get; set; }
    public string scope { get; set; }
  }


}

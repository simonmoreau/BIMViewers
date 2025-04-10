using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace bimviewers_api.Models
{
  internal class Viewzer3dToken
  {
    public string token { get; set; }
    public string url { get; set; }
    public List<object> revisions { get; set; } = [];
  }
}

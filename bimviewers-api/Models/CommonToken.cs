using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace bimviewers_api.Models
{
  public class CommonToken
  {
    public string AccessToken { get; }

    public CommonToken(string accessToken)
    {
      AccessToken = accessToken;
    }

  }
}

using Microsoft.AspNetCore.Http;
using System.Net;

namespace Web_App.Rest.Authorization.Models
{
    public class AuthorizationResponseModel
    {
        public int UserID { get; set; }
        public string UserToken { get; set; }
        public string UserRefreshToken { get; set; }


    }
}

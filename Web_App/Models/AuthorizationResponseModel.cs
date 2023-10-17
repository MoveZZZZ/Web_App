namespace Web_App.Models
{
    public class AuthorizationResponseModel
    {
        public int UserID { get; set; }
        public string UserToken { get; set; }
        public string UserRefreshToken { get; set; }

    }
}

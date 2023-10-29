namespace Web_App.Rest.JWT.Model
{
    public class RefreshTokenModel
    {
        public int UserID { get; set; }
        public string UserRole { get; set; }
        public string UserToken { get; set; }
        public string UserRefreshToken { get; set; }
    }
}

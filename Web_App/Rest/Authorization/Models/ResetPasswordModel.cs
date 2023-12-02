namespace Web_App.Rest.Authorization.Models
{
    public class ResetPasswordModel
    {
        public string? UID { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? ConfirmPassword { get; set; }
    }
}

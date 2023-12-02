namespace Web_App.Rest.User.Models
{
    public class UserModel
    {
        public int Id { get; set; }
        public string Login { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public byte[] Photo { get; set; }
        public int? isBlocked { get; set; }

    }

}

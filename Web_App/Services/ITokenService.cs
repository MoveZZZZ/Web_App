using Web_App.Models;


namespace Web_App.Services
{
    public interface ITokenService
    {
        Token CreateToken(UserModel user);
        string CreateRefreshToken(UserModel user);
    }
}

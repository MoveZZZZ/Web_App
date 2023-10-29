using Web_App.Rest.Authorization.Models;
using Web_App.Rest.JWT.Model;
using Web_App.Rest.User.Models;

namespace Web_App.Rest.JWT.Services
{
    public interface ITokenService
    {
        Token CreateToken(UserModel user);
        string CreateRefreshToken(UserModel user);
        public RefreshTokenModel RenewTokensProcessingService(string bearerToken);
        public bool IDQueryTokenVerificator(int userID, string bearerToken);
    }
}

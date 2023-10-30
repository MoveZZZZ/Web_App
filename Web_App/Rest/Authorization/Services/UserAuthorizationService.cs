using Org.BouncyCastle.Asn1.Pkcs;
using System.Data;
using System.Security.Cryptography;
using System.Text;
using Web_App.Rest.Authorization.Models;
using Web_App.Rest.Authorization.Repositories;
using Web_App.Rest.JWT.Model;
using Web_App.Rest.JWT.Services;
using Web_App.Rest.User.Models;

namespace Web_App.Rest.Authorization.Services
{
    public class UserAuthorizationService
    {
        private string _message = "";

        private readonly ITokenService _tokenService;
        private IUserAuthorizationRepository _userAuth;
        private MailSendingService _mailSendingService;

        private UserModel _userModel;

        public UserAuthorizationService(ITokenService tokenService, IConfiguration _configuration)
        {
            _mailSendingService = new MailSendingService(_configuration);
            _tokenService = tokenService;
            _userAuth = new UserAuthorizationRepository();
            _userModel = new UserModel();

        }

        public bool isUserExist(AuthorizationModel authorizationModel)
        {
            _userModel = _userAuth.getUserDataFromDB(authorizationModel);
            if (_userModel.Login != null)
            {
                return true;
            }
            return false;
        }
        public bool checkPassword(AuthorizationModel authorizationModel)
        {
            if (BCrypt.Net.BCrypt.Verify(authorizationModel.Password, _userModel.Password))
            {
                return true;
            }
            return false;
        }

        public AuthorizationResponseModel checkUser(AuthorizationModel authorizationModel)
        {
            AuthorizationResponseModel responseModel = new AuthorizationResponseModel();
            responseModel.UserID = 0;
            if (isUserExist(authorizationModel) && checkPassword(authorizationModel))
            {
                Token token = _tokenService.CreateToken(_userModel);
                responseModel.UserToken = token.AccessToken;
                responseModel.UserRefreshToken = token.RefreshToken;
                responseModel.UserID = _userModel.Id;
                responseModel.Role = _userModel.Role;
            }
            return responseModel;
        }

        
    }
}

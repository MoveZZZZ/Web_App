using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MySql.Data.MySqlClient;
using Web_App.Rest;
using Web_App.Rest.Authorization.Models;
using Web_App.Rest.Authorization.Services;
using Web_App.Rest.JWT.Model;
using Web_App.Rest.JWT.Services;
using Web_App.Rest.User.Models;


[Route("[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly ITokenService _tokenService;
    private AuthorizationResponseModel _authorizationResponseModel;


    private UserRegistrationService _userRegistrationService;





    public UserController(ITokenService tokenService)
    {
        _tokenService = tokenService;
        _authorizationResponseModel = new AuthorizationResponseModel(); 
        _userRegistrationService = new UserRegistrationService();
    }

    private static readonly List<AuthorizationModel> Users = new List<AuthorizationModel>
    {
        new AuthorizationModel { Login= "sperma", Password = "123" }
    };

    [HttpPost("login")]
    public IActionResult Login([FromBody] AuthorizationModel loginModel)
    {



            UserModel userModel = new UserModel
        { Id = 1, Login = loginModel.Login, Email = "pizda@org.com", Password = loginModel.Password };
            

        var user = Users.Find(u => u.Login == loginModel.Login && u.Password == loginModel.Password);
        if (user == null)
        {
            return Unauthorized(new { message = "Invalid email or password" });
        }


        Token token = _tokenService.CreateToken(userModel);

        _authorizationResponseModel.UserToken = token.AccessToken;
        _authorizationResponseModel.UserRefreshToken = token.RefreshToken;
        _authorizationResponseModel.UserID = userModel.Id;

        return Ok(_authorizationResponseModel);
    }

    [HttpPost]
    [Route("signup")]
    public IActionResult SignUp([FromBody] RegisterModel sign)
    {
        string errorMessage=_userRegistrationService.checkAllData(sign);
        if(errorMessage != "") {
            return Unauthorized(new {message = errorMessage});
        }
        return Ok(new { message = "SignUp successful" });
    }
}
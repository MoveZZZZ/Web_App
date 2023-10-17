using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Web_App.Models;
using Web_App.Services;

[Route("[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly ITokenService _tokenService;
    private AuthorizationResponseModel _authorizationResponseModel;


    public UserController(ITokenService tokenService)
    {
        _tokenService = tokenService;
        _authorizationResponseModel = new AuthorizationResponseModel(); 
    }

    private static readonly List<UserLogin> Users = new List<UserLogin>
    {
        new UserLogin { Login= "sperma", Password = "123" }
    };

    [HttpPost("login")]
    public IActionResult Login([FromBody] UserLogin loginModel)
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
    public IActionResult SignUp([FromBody] SignUpModel sign)
    {
        
        return Ok(new { message = "SignUp successful" });
    }
}
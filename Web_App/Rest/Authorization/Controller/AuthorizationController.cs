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
public class AuthorizationController : ControllerBase
{
    private readonly ITokenService _tokenService;
    private AuthorizationResponseModel _authorizationResponseModel;


    public AuthorizationController(ITokenService tokenService)
    {
        _tokenService = tokenService;
        _authorizationResponseModel = new AuthorizationResponseModel(); 
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] AuthorizationModel loginModel)
    {




          
           
/*

        Token token = _tokenService.CreateToken(userModel);

        _authorizationResponseModel.UserToken = token.AccessToken;
        _authorizationResponseModel.UserRefreshToken = token.RefreshToken;
        _authorizationResponseModel.UserID = userModel.Id;
*/


       //return Unauthorized(new { message = "Invalid email or password" });
        return Ok(_authorizationResponseModel);
    }

   
}
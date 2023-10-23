using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MySql.Data.MySqlClient;
using System.Net;
using Web_App.Rest;
using Web_App.Rest.Authorization.Models;
using Web_App.Rest.Authorization.Repositories;
using Web_App.Rest.Authorization.Services;
using Web_App.Rest.JWT.Model;
using Web_App.Rest.JWT.Services;
using Web_App.Rest.User.Models;


[Route("[controller]")]
[ApiController]
public class AuthorizationController : ControllerBase
{
    private readonly ITokenService _tokenService;
    private UserAuthorizationService _userAuthorizationService;


    public AuthorizationController(ITokenService tokenService)
    {
        _tokenService = tokenService;
        _userAuthorizationService = new UserAuthorizationService(_tokenService);
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] AuthorizationModel loginModel)
    {
        AuthorizationResponseModel _authorizationResponseModel=_userAuthorizationService.checkUser(loginModel);
        if(_authorizationResponseModel.UserID!=0)
        {
            this.Response.Cookies.Append("AccessToken", _authorizationResponseModel.UserToken, new CookieOptions()
            {
                Expires = DateTimeOffset.Now.AddMinutes(2),
                Path = "/",
                HttpOnly = true,
                Domain = null,
                IsEssential = true,
                Secure = true,
                SameSite = SameSiteMode.Strict
            });
            this.Response.Cookies.Append("RefreshToken", _authorizationResponseModel.UserRefreshToken, new CookieOptions()
            {
                Expires = DateTimeOffset.Now.AddMinutes(4800),
                Path = "/",
                HttpOnly = true,
                Domain = null,
                IsEssential = true,
                Secure = true,
                SameSite = SameSiteMode.Strict
            });
            return Ok(_authorizationResponseModel);
        }
        return Unauthorized(new { message = "bad login or password" });      
/*

        Token token = _tokenService.CreateToken(userModel);

        _authorizationResponseModel.UserToken = token.AccessToken;
        _authorizationResponseModel.UserRefreshToken = token.RefreshToken;
        _authorizationResponseModel.UserID = userModel.Id;
*/


       //return Unauthorized(new { message = "Invalid email or password" });
        //return Ok(_authorizationResponseModel);
        
    }

   
}
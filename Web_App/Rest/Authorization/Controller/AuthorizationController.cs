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
    private UserMFAuthService _userMFAuthService;

    public AuthorizationController(ITokenService tokenService, IConfiguration _conf)
    {
        _tokenService = tokenService;
        _userAuthorizationService = new UserAuthorizationService(_tokenService, _conf);
        _userMFAuthService = new UserMFAuthService(tokenService, _conf);
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] AuthorizationModel loginModel)
    {
        AuthorizationResponseModel _authorizationResponseModel = _userAuthorizationService.checkUser(loginModel);
        if (_authorizationResponseModel.UserID == -1)
        {
            return Unauthorized(new { message = "Account is temporary blocked, try again later!" });
        }
        if (_authorizationResponseModel.UserID != 0 && _authorizationResponseModel.Role != "ADMIN")
        {
            this.Response.Cookies.Append("AccessToken", _authorizationResponseModel.UserToken, new CookieOptions()
            {
                Expires = DateTimeOffset.Now.AddSeconds(30),
                Path = "/",
                HttpOnly = true,
                Domain = null,
                IsEssential = true,
                Secure = true,
                SameSite = SameSiteMode.Strict
            });
            this.Response.Cookies.Append("RefreshToken", _authorizationResponseModel.UserRefreshToken, new CookieOptions()
            {
                Expires = DateTimeOffset.Now.AddMinutes(2880),
                Path = "/token/",
                HttpOnly = true,
                Domain = null,
                IsEssential = true,
                Secure = true,
                SameSite = SameSiteMode.Strict
            });
            _authorizationResponseModel.UserRefreshToken = "";
            _authorizationResponseModel.UserToken = "";
            return Ok(_authorizationResponseModel);
        }
        else if (_authorizationResponseModel.UserID != 0 && _authorizationResponseModel.Role == "ADMIN")
        {
            string uid = _userMFAuthService.generateAdminUID(_authorizationResponseModel.UserID);
            if (uid == "")
            {
                return Ok(new { message = "Please, check your mailbox to proceed with 2-step verification" });
            }
            return Ok(new { UID = uid});
        }
        return Unauthorized(new { message = "bad login or password" });  
    }
}
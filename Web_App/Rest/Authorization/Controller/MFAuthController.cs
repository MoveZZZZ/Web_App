using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MySql.Data.MySqlClient;
using System.Net;
using Web_App.Rest;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web_App.Rest.Authorization.Models;
using Web_App.Rest.Authorization.Services;
using Web_App.Rest.JWT.Model;
using Web_App.Rest.JWT.Services;
using Web_App.Rest.User.Models;
using Microsoft.AspNetCore.Cors;

[EnableCors("AllowSpecificOrigins")]
[Route("[controller]")]
[ApiController]
public class MFAuthController : ControllerBase
{
    private UserMFAuthService _userMFAuth;
    public MFAuthController(ITokenService _token, IConfiguration _conf)
    {
        _userMFAuth = new UserMFAuthService(_token, _conf);
    }

    [HttpPost]
    [Route("checklink")]
    public IActionResult ValidateMFAuthLink([FromBody] MFAuthModel model)
    {
        string msg = _userMFAuth.checkExistMFAuthUID(model.UID);
        return Ok(new { message = msg });
    }

    [HttpPost]
    [Route("codesubmit")]
    public IActionResult MFAuthCodeSubmit([FromBody] MFAuthModel model) 
    {
        AuthorizationResponseModel responseModel = _userMFAuth.codeSubmit(model.Code, model.UID);
        if (responseModel.UserID == 0) 
        {
            return Unauthorized(new { message = "Some verification errors appear, please, try again." });
        }
        this.Response.Cookies.Append("AccessToken", responseModel.UserToken, new CookieOptions()
        {
            Expires = DateTimeOffset.Now.AddSeconds(30),
            Path = "/",
            HttpOnly = true,
            Domain = null,
            IsEssential = true,
            Secure = true,
            SameSite = SameSiteMode.Strict
        });
        this.Response.Cookies.Append("RefreshToken", responseModel.UserRefreshToken, new CookieOptions()
        {
            Expires = DateTimeOffset.Now.AddMinutes(2880),
            Path = "/token/",
            HttpOnly = true,
            Domain = null,
            IsEssential = true,
            Secure = true,
            SameSite = SameSiteMode.Strict
        });
        return Ok(responseModel);
    }
}

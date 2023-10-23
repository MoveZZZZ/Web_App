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
public class TokenController : ControllerBase
{
    private readonly ITokenService _tokenService;

    public TokenController(ITokenService tokenService)
    {
        _tokenService = tokenService;
    }

    [HttpGet("refresh_access_token")]
    public IActionResult AccessTokenRenew()
    {
        AuthorizationResponseModel _response = null;
        try 
        { 
            _response = _tokenService.RenewTokensProcessingService(Request.Cookies["RefreshToken"]); 
        }
        catch (Exception ex) 
        { 
            return Unauthorized(); 
        }
        if(_response != null && _response.UserID != 0)
        {
            this.Response.Cookies.Append("AccessToken",  _response.UserToken, new CookieOptions()
            {
                Expires = DateTimeOffset.Now.AddMinutes(2),
                Path = "/",
                HttpOnly = true,
                Domain = null,
                IsEssential = true,
                Secure = true,
                SameSite = SameSiteMode.Strict
            });
            this.Response.Cookies.Append("RefreshToken", _response.UserRefreshToken, new CookieOptions()
            {
                Expires = DateTimeOffset.Now.AddMinutes(4800),
                Path = "/",
                HttpOnly = true,
                Domain = null,
                IsEssential = true,
                Secure = true,
                SameSite = SameSiteMode.Strict
            });
            return Ok(_response);
        }
        this.Response.Cookies.Append("AccessToken", _response.UserToken, new CookieOptions()
        {
            Expires = DateTimeOffset.Now.AddDays(-1),
            Path = "/",
            HttpOnly = true,
            Domain = null,
            IsEssential = true,
            Secure = true,
            SameSite = SameSiteMode.Strict
        });
        this.Response.Cookies.Append("RefreshToken", _response.UserRefreshToken, new CookieOptions()
        {
            Expires = DateTimeOffset.Now.AddDays(-1),
            Path = "/",
            HttpOnly = true,
            Domain = null,
            IsEssential = true,
            Secure = true,
            SameSite = SameSiteMode.Strict
        });
        return Unauthorized();  
    }
}



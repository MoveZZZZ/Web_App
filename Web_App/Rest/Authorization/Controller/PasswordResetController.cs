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

[Route("[controller]")]
[ApiController]
public class PasswordResetController : ControllerBase
{
    private UserResetPasswordService _userResetPasswordService;
    public PasswordResetController()
    {
        _userResetPasswordService = new UserResetPasswordService();
    }

    [HttpPost]
    [Route("genresetmail")]
    public IActionResult GenereteResetMail([FromQuery] string email)
    {
        try
        {
            _userResetPasswordService.processingUserResetPasswordRequest(email);
        }
        catch
        {
            return Unauthorized(new { message = "Wrong Email!" });
        }
        return Ok(new { message = "Email were successfuly send!" });
    }
    [HttpPost]
    [Route("checklink")]
    public IActionResult ValidateRecoveryLink([FromQuery] string uid)
    {
       string msg = _userResetPasswordService.checkExistUID(uid);
        return Ok(new {message =  msg});
    }
    public IActionResult ResetPassword([FromBody] string newPassword, [FromQuery] string resetID)
    {
        return Ok();
    }

}


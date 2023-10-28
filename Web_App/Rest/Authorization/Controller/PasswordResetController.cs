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
    public PasswordResetController(IConfiguration conf)
    {
        _userResetPasswordService = new UserResetPasswordService(conf);
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
        if (_userResetPasswordService.passwordRecoveryUIDvalidation(uid))
        {
            return Ok(new { message = "Ok" });
        }
        else { return BadRequest(new { message = "UID is not valid" }); }
    }
    public IActionResult ResetPassword([FromBody] string newPassword, [FromQuery] string resetID)
    {
        return Ok();
    }

}


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
using System.Reflection.Metadata;

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
    public IActionResult GenereteResetMail([FromBody] ResetPasswordModel model)
    {
        try
        {
            _userResetPasswordService.processingUserResetPasswordRequest(model.Email);
        }
        catch
        {
            return Unauthorized(new { message = "Wrong Email!" });
        }
        return Ok(new { message = "Email were successfuly send!" });
    }

    [HttpPost]
    [Route("checklink")]
    public IActionResult ValidateRecoveryLink([FromBody] ResetPasswordModel model)
    {
        string msg = _userResetPasswordService.checkExistUID(model.UID);
        return Ok(new { message = msg });
    }

    [HttpPost]
    [Route("recoverypage/changepassword")]
    public IActionResult ChangePassword([FromBody] ResetPasswordModel model)
    {
        string message = _userResetPasswordService.ChangePaswwordUser(model.Password, model.ConfirmPassword, model.UID);
        return Ok(new { message = message });
    }
}


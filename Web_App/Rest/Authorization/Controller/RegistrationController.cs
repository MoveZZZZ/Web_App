using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web_App.Rest.Authorization.Models;
using Web_App.Rest.Authorization.Services;

[Route("[controller]")]
[ApiController]
public class RegistrationController : ControllerBase
{
    private UserRegistrationService _userRegistrationService;
    public RegistrationController(IConfiguration _config)
    {
        _userRegistrationService = new UserRegistrationService(_config);
    }

    [AllowAnonymous]
    [HttpPost]
    [Route("signup")]
    public IActionResult SignUp([FromBody] RegisterModel sign)
    {
        string errorMessage = _userRegistrationService.addUserInTempDB(sign);
        if (errorMessage != "")
        {
            return Unauthorized(new { message = errorMessage });
        }
        return Ok(new { message = "Ok" });
    }
    [HttpPost]
    [Route("verifymail")]
    public IActionResult VerifyEmail([FromBody] MFAuthModel model)
    {

        string errorMessage = _userRegistrationService.addUserInDBAfterCheck(model.UID);
        if (errorMessage != "")
        {
            return Unauthorized(new { message = errorMessage });
        }
        return Ok(new { message = "Ok" });


    }

}


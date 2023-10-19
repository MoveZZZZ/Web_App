using Microsoft.AspNetCore.Mvc;
using Web_App.Rest.Authorization.Models;
using Web_App.Rest.Authorization.Services;

[Route("[controller]")]
[ApiController]
public class RegistrationController:ControllerBase
    {
    private UserRegistrationService _userRegistrationService;
    public RegistrationController ()
    {
        _userRegistrationService= new UserRegistrationService();
    }

    [HttpPost]
    [Route("signup")]
    public IActionResult SignUp([FromBody] RegisterModel sign)
    {
        string errorMessage = _userRegistrationService.checkAllData(sign);
        if (errorMessage != "")
        {
            return Unauthorized(new { message = errorMessage });
        }
        return Ok();
    }
}


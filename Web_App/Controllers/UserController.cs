using Microsoft.AspNetCore.Mvc;
using Web_App.Models;

[Route("[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private static readonly List<UserModel> Users = new List<UserModel>
    {
        new UserModel { Id = 1, Email = "user@example.com", Password = "password123" }
    };

    [HttpPost("login")]
    public IActionResult Login([FromBody] UserModel login)
    {
        var user = Users.Find(u => u.Email == login.Email && u.Password == login.Password);
        if (user == null)
        {
            return Unauthorized(new { message = "Invalid email or password" });
        }
        return Ok(new { message = "Login successful" });
    }
}
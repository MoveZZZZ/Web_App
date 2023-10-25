using Microsoft.AspNetCore.Mvc;
using Web_App.Rest.Product.Model;
using Web_App.Rest.User.Models;
using Web_App.Rest.User.Services;

namespace Web_App.Rest.User.Controller
{
    [Route("user")]
    [ApiController]
    public class UserController:ControllerBase
    {
        public UserService _userservice;
        public UserController()
        {
            _userservice = new UserService();
        }



        [HttpGet]
        public IActionResult GetUserData([FromQuery] int userID)
        {
            UserModel  user = new UserModel();
            user = _userservice.getUnameEmailPhotoByUserID(userID);

            return Ok(new{ mail = user.Email, photo = user.Photo, login = user.Login});
        }

        [HttpPost]
        [Route("changeavatar")]
        public IActionResult changeUserAvatar([FromForm] IFormFile Image, [FromForm] int userID)
        {
            _userservice.changeUserAvatar(Image, userID);


            return Ok(new{message ="OK!"});
        }

    }
}

﻿using Microsoft.AspNetCore.Mvc;
using Web_App.Rest.JWT.Services;
using Web_App.Rest.Product.Model;
using Web_App.Rest.User.Models;
using Web_App.Rest.User.Services;
using Microsoft.AspNetCore.Authorization;
using Web_App.Rest.JWT.Services;

namespace Web_App.Rest.User.Controller
{
    [Route("user")]
    [ApiController]
    public class UserController:ControllerBase
    {
       
        public UserService _userservice;
        private readonly ITokenService _tokenService;

        public UserController(IConfiguration _conf)
        {
            _userservice = new UserService();
            _tokenService = new TokenService(_conf);
        }

        [Authorize]
        [HttpGet]
        public IActionResult GetUserData([FromQuery] int userID)
        {
            string token = Request.Cookies["AccessToken"];
            if (!_tokenService.IDQueryTokenVerificator(userID, token))
            {
                return BadRequest(new { message = "UnAuthorized Attempt to Access Data belong to Other User!" });
            }
            UserModel  user = new UserModel();
            user = _userservice.getUnameEmailPhotoByUserID(userID);

            return Ok(new{ mail = user.Email, photo = user.Photo, login = user.Login});
        }

        [Authorize]
        [HttpPost]
        [Route("changeavatar")]
        public IActionResult changeUserAvatar([FromForm] IFormFile Image, [FromForm] int userID)
        {
            string token = Request.Cookies["AccessToken"];
            if (!_tokenService.IDQueryTokenVerificator(userID, token))
            {
                return BadRequest(new { message = "UnAuthorized Attempt to Access Data belong to Other User!" });
            }
            _userservice.changeUserAvatar(Image, userID);
            return Ok(new{message ="OK!"});
        }

        [HttpPost]
        [Route("changelogin")]
        public IActionResult changeUserLogin([FromForm] ModifyUserRequestModel model)
        {
            string message = _userservice.changeLoginByID(model);
            return Ok(new {message = message});
        }
        [HttpPost]
        [Route("changeemail")]
        public IActionResult changeUserEmail([FromForm] ModifyUserRequestModel model)
        {
            string message = _userservice.changeEmailByID(model);
            return Ok(new { message = message });
        }
        [HttpPost]
        [Route("changepassword")]
        public IActionResult changeUserPassword([FromForm] ModifyUserRequestModel model)
        {
            string message = _userservice.changePasswordByID(model);
            return Ok(new { message = message });
        }
        [HttpPost]
        [Route("deleteaccount")]
        public IActionResult deleteUserAccountByID([FromForm] ModifyUserRequestModel model)
        {
            string message = _userservice.removeAccountByID(model);
            return Ok(new { message = message });
        }

    }
}
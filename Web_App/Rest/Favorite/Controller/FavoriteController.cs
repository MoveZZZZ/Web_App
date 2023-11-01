using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics.Contracts;
using System.Drawing;
using Web_App.Rest.Favorite.Models;
using Web_App.Rest.Favorite.Services;
using Web_App.Rest.JWT.Services;

namespace Web_App.Rest.Favorite.Controller
{
    [Route("[controller]")]
    [ApiController]
    public class FavoriteController : ControllerBase
    {
        FavoriteService _favoriteService;
        private readonly ITokenService _tokenService;
        public FavoriteController(IConfiguration _conf)
        {
            _favoriteService = new FavoriteService();
            _tokenService = new TokenService(_conf);
        }

        [Authorize]
        [HttpPost]
        [Route("addfavorite")]
        public IActionResult AddFavorite([FromBody] FavoriteRequestModel model)
        {
            string token = Request.Cookies["AccessToken"];
            if (!_tokenService.IDQueryTokenVerificator(model.ClientID, token))
            {
                return BadRequest(new { message = "UnAuthorized Attempt to Access Data belong to Other User!" });
            }
            _favoriteService.addToFavorite(model);
            return Ok(new { message = "Added successfully" });
        }

        [Authorize]
        [HttpGet]
        [Route("getlistfavorite")]
        public IActionResult GetIndexFavorite([FromQuery] int clientId)
        {
            string token = Request.Cookies["AccessToken"];
            if (!_tokenService.IDQueryTokenVerificator(clientId, token))
            {
                return BadRequest(new { message = "UnAuthorized Attempt to Access Data belong to Other User!" });
            }
            List<int> indexes = new List<int>();
            indexes = _favoriteService.getAllIndexesFavoriteClient(clientId);
            return Ok(new { ListIndex = indexes });
        }

        [Authorize]
        [HttpDelete]
        [Route("removefavoriteitem")]
        public IActionResult RemoveFavoriteItem([FromBody] FavoriteRequestModel model)
        {
            string token = Request.Cookies["AccessToken"];
            if (!_tokenService.IDQueryTokenVerificator(model.ClientID, token))
            {
                return BadRequest(new { message = "UnAuthorized Attempt to Access Data belong to Other User!" });
            }
            _favoriteService.removeFovorite(model);
            return Ok(new { message = "Deleted successfully" });
        }

        [Authorize]
        [HttpGet]
        [Route("getallfavoriteuser")]
        public IActionResult GetAllFavoriteItem(int userID)
        {
            string token = Request.Cookies["AccessToken"];
            if (!_tokenService.IDQueryTokenVerificator(userID, token))
            {
                return BadRequest(new { message = "UnAuthorized Attempt to Access Data belong to Other User!" });
            }
            List<FavoritePageResponseModel> response = new List<FavoritePageResponseModel>();
            response = _favoriteService.getAllUserFavorite(userID);
            float sum = response.Sum(t => t.Cost);

            return Ok(new { towars = response, summary = sum });
        }
    }



}

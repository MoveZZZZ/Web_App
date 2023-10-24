using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics.Contracts;
using Web_App.Rest.Favorite.Models;
using Web_App.Rest.Favorite.Services;

namespace Web_App.Rest.Favorite.Controller
{
    [Route("[controller]")]
    [ApiController]
    public class FavoriteController : ControllerBase
    {
        FavoriteService _favoriteService;
        public FavoriteController()
        {
            _favoriteService = new FavoriteService();
        }

        //[Authorize]
        [HttpPost]
        [Route("addfavorite")]
        public IActionResult AddFavorite([FromBody] FavoriteRequestModel model)
        {
            _favoriteService.addToFavorite(model);
            return Ok();
        }

        //[Authorize]
        [HttpGet]
        [Route("getlistfavorite")]
        public IActionResult GetIndexFavorite([FromQuery] int clientId)
        {
            List<int> indexes = new List<int>();
            indexes = _favoriteService.getAllIndexesFavoriteClient(clientId);
            return Ok(new { ListIndex = indexes });
        }

        //[Authorize]
        [HttpPost]
        [Route("removefavoriteitem")]
        public IActionResult RemoveFavoriteItem([FromBody] FavoriteRequestModel model)
        {
            _favoriteService.removeFovorite(model);
            return Ok();
        }

        //[Authorize]
        [HttpGet]
        [Route("getallfavoriteuser")]
        public IActionResult GetAllFavoriteItem(int userID)
        {
            List<FavoritePageResponseModel> response = new List<FavoritePageResponseModel>();
            response = _favoriteService.getAllUserFavorite(userID);
            float sum = response.Sum(t => t.Cost);

            return Ok(new { towars = response, summary = sum });
        }
    }



}

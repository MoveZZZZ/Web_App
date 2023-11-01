using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Drawing;
using Web_App.Rest.Cart.Model;
using Web_App.Rest.Cart.Services;
using Web_App.Rest.JWT.Services;

namespace Web_App.Rest.Cart.Controller
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class CartController : ControllerBase
    {
        CartService _cartService;
        private readonly ITokenService _tokenService;
        public CartController(IConfiguration _conf)
        {
            _cartService = new CartService();
            _tokenService = new TokenService(_conf);
        }

        [HttpGet]
        [Route("getlistcart")]
        public IActionResult GetCartItemsList([FromQuery] int userID)
        {
            string token = Request.Cookies["AccessToken"];
            if (!_tokenService.IDQueryTokenVerificator(userID, token))
            {
                return BadRequest(new { message = "UnAuthorized Attempt to Access Data belong to Other User!" });
            }
            List<CartModelResponse> response = new List<CartModelResponse>();
            response = _cartService.getCartItem(userID);

            return Ok(new { Towar = response });
        }

        [HttpGet]
        [Route("getindexlistcart")]
        public IActionResult GetIndexCartList([FromQuery] int userID)
        {
            string token = Request.Cookies["AccessToken"];
            if (!_tokenService.IDQueryTokenVerificator(userID, token))
            {
                return BadRequest(new { message = "UnAuthorized Attempt to Access Data belong to Other User!" });
            }
            List<int> response = new List<int>();
            response = _cartService.getCartIndexesUser(userID);
            return Ok(new { cartIndexesList = response });
        }

        [HttpPost]
        [Route("addtocart")]
        public IActionResult AddToCart([FromBody] CartModelRequest model)
        {
            string token = Request.Cookies["AccessToken"];
            if (!_tokenService.IDQueryTokenVerificator(model.IdClient, token))
            {
                return BadRequest(new { message = "UnAuthorized Attempt to Access Data belong to Other User!" });
            }
            _cartService.addTowarInCart(model);
            return Ok(new { message = "zaebis!" });
        }

        [HttpPost]
        [Route("removefromcart")]
        public IActionResult RemoveItemFromCart([FromBody] CartModelRequest model)
        {
            string token = Request.Cookies["AccessToken"];
            if (!_tokenService.IDQueryTokenVerificator(model.IdClient, token))
            {
                return BadRequest(new { message = "UnAuthorized Attempt to Access Data belong to Other User!" });
            }
            _cartService.removeTowarFromCart(model);
            return Ok(new { message = "jebnia!" });
        }
    }
}

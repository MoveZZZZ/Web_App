using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web_App.Rest.Cart.Model;
using Web_App.Rest.Cart.Services;

namespace Web_App.Rest.Cart.Controller
{
    [Route("[controller]")]
    [ApiController]
    public class CartController:ControllerBase
    {
        CartService _cartService;
        public CartController()
        {
            _cartService = new CartService();
        }

        [Authorize]
        [HttpGet]
        [Route("getlistcart")]
        public IActionResult GetCartItemsList([FromQuery] int userID)
        {
            List<CartModelResponse> response = new List<CartModelResponse>();
            response= _cartService.getCartItem(userID);

            return Ok( new {Towar = response});
        }

        [Authorize]
        [HttpGet]
        [Route("getindexlistcart")]
        public IActionResult GetIndexCartList([FromQuery] int userID)
        {
            List<int> response = new List<int>();
            response=_cartService.getCartIndexesUser(userID);
            return Ok(new {cartIndexesList = response});
        }

        [Authorize]
        [HttpPost]
        [Route("addtocart")]
        public IActionResult AddToCart([FromBody] CartModelRequest model)
        {
            _cartService.addTowarInCart(model);
            return Ok(new {message = "zaebis!"});
        }

        //[Authorize]
        [HttpPost]
        [Route("removefromcart")]
        public IActionResult RemoveItemFromCart([FromBody] CartModelRequest model)
        {
            _cartService.removeTowarFromCart(model);

            return Ok(new { message = "jebnia!" });
        }
    }
}

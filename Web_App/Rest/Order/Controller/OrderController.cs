using Braintree.Exceptions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MySqlX.XDevAPI;
using System.Collections.Generic;
using Web_App.Rest.JWT.Identity;
using Web_App.Rest.JWT.Services;
using Web_App.Rest.Order.Model;
using Web_App.Rest.Order.Service;

namespace Web_App.Rest.Order.Controller
{
    [Route("order")]
    [ApiController]
    [Authorize]
    public class OrderController : ControllerBase
    {
        private readonly ITokenService _tokenService;
        private OrderService _orderService;
        public OrderController(IConfiguration _conf)
        {
            _orderService = new OrderService(_conf);
            _tokenService = new TokenService(_conf);
        }

        [HttpPost]
        [Route("addorder")]
        public IActionResult addOrder(OrderRequestModel orderRequestModel)
        {
            string token = Request.Cookies["AccessToken"];
            if (!_tokenService.IDQueryTokenVerificator(orderRequestModel.ClientID, token))
            {
                return BadRequest(new { message = "UnAuthorized Attempt to Access Data belong to Other User!" });
            }
            string msg = _orderService.checkDataOrder(orderRequestModel);
            if (msg != "")
                return Ok(new { message = msg });
            _orderService.addOrderToDB(orderRequestModel);
            _orderService.addOrderProductToTable(orderRequestModel.TowarCount);
            _orderService.removeProductFromCart();
            _orderService.updateCountProducts(orderRequestModel.TowarCount, orderRequestModel.TowarIdList);

            return Ok(new { message = "" });
        }
        [HttpGet]
        public IActionResult getOrderDetails([FromQuery] int orderID, int clientID)
        {
            string token = Request.Cookies["AccessToken"];
            if (!_tokenService.IDQueryTokenVerificator(clientID, token))
            {
                return BadRequest(new { message = "UnAuthorized Attempt to Access Data belong to Other User!" });
            }
            OrderDetailsModel orderDetailsModel = new OrderDetailsModel();
            orderDetailsModel = _orderService.getOrderDetailsModel(orderID, clientID);
            return Ok(orderDetailsModel);
        }
        [HttpGet]
        [Route("getallordersuser")]
        public IActionResult getOrdersUser([FromQuery] int userID)
        {
            string token = Request.Cookies["AccessToken"];
            if (!_tokenService.IDQueryTokenVerificator(userID, token))
            {
                return BadRequest(new { message = "UnAuthorized Attempt to Access Data belong to Other User!" });
            }
            List<OrdersUserModel> model = new List<OrdersUserModel>();
            model = _orderService.getOrdersUsers(userID);


            return Ok(model);
        }

        [Authorize]
        [RequiresClaim(IdentityData.AdminUserClaimName, "ADMIN")]
        [HttpGet]
        [Route("admin/getallorder")]
        public IActionResult getAllOrders([FromQuery] int userID)
        {

            List<AllOrderAdminModel> model = new List<AllOrderAdminModel>();
            model = _orderService.getAllOrders();


            return Ok(model);
        }
        [Authorize]
        [RequiresClaim(IdentityData.AdminUserClaimName, "ADMIN")]
        [HttpGet]
        [Route("admin/getallorderbyemail")]
        public IActionResult getAllOrdersByEmail([FromQuery] string userEmail)
        {

            List<AllOrderAdminModel> model = new List<AllOrderAdminModel>();

            model = _orderService.getAllOrdersByUserEmail(userEmail);


            return Ok(model);
        }
        [Authorize]
        [RequiresClaim(IdentityData.AdminUserClaimName, "ADMIN")]
        [HttpGet]
        [Route("admin/orderdetails")]
        public IActionResult getOrderDetailsAdmin([FromQuery] int orderID, string emailUser)
        {
            OrderDetailsModel orderDetailsModel = new OrderDetailsModel();
            orderDetailsModel = _orderService.getOrderDetailsModelAdmin(orderID, emailUser);
            return Ok(orderDetailsModel);
        }
        [Authorize]
        [RequiresClaim(IdentityData.AdminUserClaimName, "ADMIN")]
        [HttpDelete]
        [Route("admin/removeorder")]
        public IActionResult removeOrderAdmin([FromQuery] int orderID)
        {
            try
            {
                _orderService.removeOrderAdmin(orderID);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500);
            }

        }

    }
}

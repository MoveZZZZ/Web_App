using Braintree.Exceptions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using MySqlX.XDevAPI;
using System.Collections.Generic;
using Web_App.Rest.JWT.Identity;
using Web_App.Rest.JWT.Services;
using Web_App.Rest.Order.Model;
using Web_App.Rest.Order.Service;

namespace Web_App.Rest.Order.Controller
{
    [EnableCors("AllowSpecificOrigins")]
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

        [RequiresClaim(IdentityData.AdminUserClaimName, "ADMIN")]
        [HttpGet]
        [Route("admin/getallorder")]
        public IActionResult getAllOrders()
        {
            List<AllOrderAdminModel> model = new List<AllOrderAdminModel>();
            model = _orderService.getAllOrders();
            return Ok(model);
        }

        [RequiresClaim(IdentityData.AdminUserClaimName, "ADMIN")]
        [HttpPost]
        [Route("admin/getallorderbyemail")]
        public IActionResult getAllOrdersByEmail([FromBody] OrderUserDataModel userModel)
        {
            List<AllOrderAdminModel> model = new List<AllOrderAdminModel>();
            model = _orderService.getAllOrdersByUserEmail(userModel.email);
            return Ok(model);
        }

        [RequiresClaim(IdentityData.AdminUserClaimName, "ADMIN")]
        [HttpPost]
        [Route("admin/orderdetails")]
        public IActionResult getOrderDetailsAdmin([FromBody] OrderUserDataModel userModel)
        {
            OrderDetailsModel orderDetailsModel = new OrderDetailsModel();
            orderDetailsModel = _orderService.getOrderDetailsModelAdmin(Convert.ToInt32(userModel.orderID), userModel.email, "");
            return Ok(orderDetailsModel);
        }

        [RequiresClaim(IdentityData.AdminUserClaimName, "ADMIN")]
        [HttpGet]
        [Route("admin/orderdetails/archive")]
        public IActionResult getOrderDetailsArchiveAdmin([FromQuery] int orderID, string username)
        {
            OrderDetailsModel orderDetailsModel = new OrderDetailsModel();
            orderDetailsModel = _orderService.getOrderDetailsModelAdmin(orderID, "" ,username);
            return Ok(orderDetailsModel);
        }

        [RequiresClaim(IdentityData.AdminUserClaimName, "ADMIN")]
        [HttpPost]
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

        [RequiresClaim(IdentityData.AdminUserClaimName, "ADMIN")]
        [HttpGet]
        [Route("admin/getallarchiveorder")]
        public IActionResult getAllOrdersArchiveAdmin()
        {
            List<AllOrderAdminModel> model = new List<AllOrderAdminModel>();
            model = _orderService.getAllArchiveOrders();
            return Ok(model);
        }

        [RequiresClaim(IdentityData.AdminUserClaimName, "ADMIN")]
        [HttpGet]
        [Route("admin/getallarchiveorder/searchusername")]
        public IActionResult getAllOrdersArchiveByUsernameAdmin([FromQuery] string username)
        {
            List<AllOrderAdminModel> model = new List<AllOrderAdminModel>();
            model = _orderService.getAllArchiveOrdersByUsername(username);
            return Ok(model);
        }

        [RequiresClaim(IdentityData.AdminUserClaimName, "ADMIN")]
        [HttpGet]
        [Route("admin/getallorder/lastday")]
        public IActionResult getAllOrdersLastDay()
        {
            List<AllOrderAdminModel> model = new List<AllOrderAdminModel>();
            model = _orderService.getAllOrdersLastDay();
            return Ok(model);
        }

        [RequiresClaim(IdentityData.AdminUserClaimName, "ADMIN")]
        [HttpGet]
        [Route("admin/getallorder/lastmonath")]
        public IActionResult getAllOrdersLastMonath()
        {
            List<AllOrderAdminModel> model = new List<AllOrderAdminModel>();
            model = _orderService.getAllOrdersLastMonath();
            return Ok(model);
        }

        [RequiresClaim(IdentityData.AdminUserClaimName, "ADMIN")]
        [HttpGet]
        [Route("admin/getallorder/lastyear")]
        public IActionResult getAllOrdersLastYear()
        {
            List<AllOrderAdminModel> model = new List<AllOrderAdminModel>();
            model = _orderService.getAllOrdersLastYear();
            return Ok(model);
        }

        [RequiresClaim(IdentityData.AdminUserClaimName, "ADMIN")]
        [HttpGet]
        [Route("admin/getallorder/today")]
        public IActionResult getAllOrdersToday()
        {
            List<AllOrderAdminModel> model = new List<AllOrderAdminModel>();
            model = _orderService.getAllOrdersToday();
            return Ok(model);
        }

        [RequiresClaim(IdentityData.AdminUserClaimName, "ADMIN")]
        [HttpGet]
        [Route("admin/getallorder/thismonath")]
        public IActionResult getAllOrdersThisMonath()
        {
            List<AllOrderAdminModel> model = new List<AllOrderAdminModel>();
            model = _orderService.getAllOrdersThisMon();
            return Ok(model);
        }

        [RequiresClaim(IdentityData.AdminUserClaimName, "ADMIN")]
        [HttpGet]
        [Route("admin/getallorder/thisyear")]
        public IActionResult getAllOrdersThisYear()
        {
            List<AllOrderAdminModel> model = new List<AllOrderAdminModel>();
            model = _orderService.getAllOrdersThisYear();
            return Ok(model);
        }
    }
}

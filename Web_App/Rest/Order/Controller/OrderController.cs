using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web_App.Rest.Order.Model;
using Web_App.Rest.Order.Service;

namespace Web_App.Rest.Order.Controller
{
    [Route("order")]
    [ApiController]
    public class OrderController:ControllerBase
    {

        private OrderService _orderService;
        public OrderController()
        {
            _orderService = new OrderService();
        }

        //[Authorize]
        [HttpPost]
        [Route("addorder")]
        public IActionResult addOrder(OrderRequestModel orderRequestModel)
        {
            _orderService.addOrderToDB(orderRequestModel);
            _orderService.addOrderProductToTable(orderRequestModel.TowarCount);
            _orderService.removeProductFromCart();
            _orderService.updateCountProducts(orderRequestModel.TowarCount, orderRequestModel.TowarIdList);

            return Ok(new {Message ="Zajebis" });
        }



    }
}

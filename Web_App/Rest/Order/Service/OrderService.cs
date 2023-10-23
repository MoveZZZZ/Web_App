using Web_App.Rest.Cart.Services;
using Web_App.Rest.Order.Model;
using Web_App.Rest.Order.Repository;
using Web_App.Rest.Product.Service;

namespace Web_App.Rest.Order.Service
{
    public class OrderService
    {
        private ProductService _productService;
        private CartService _cartService;
        private IOrderRepository _orderRepository;
        private OrderModel _orderModel;
        public OrderService()
        {
            _orderRepository = new OrderRepository();
            _orderModel = new OrderModel();
            _productService = new ProductService();
            _cartService = new CartService();
        }

        public void fillModel(OrderRequestModel orderRequestModel)
        {
            _orderModel.UserID = orderRequestModel.ClientID;
            _orderModel.ProductIDList = orderRequestModel.TowarIdList;
            _orderModel.OrderComment = orderRequestModel.Ordercom;
            _orderModel.AccessPointID = orderRequestModel.AccessPointId;
            _orderModel.Cost = orderRequestModel.Cost;
            if(orderRequestModel.PaymentMethod=="Card")
            {
                _orderModel.Status = "Payment";
            }
            else
            _orderModel.Status = "Waiting for payment...";

        }
        public void addOrderToDB (OrderRequestModel orderRequestModel)
        {
            fillModel(orderRequestModel);
            _orderModel.OrderID = _orderRepository.addOrderAndGetIndex(orderRequestModel.ClientID, orderRequestModel.Ordercom, orderRequestModel.AccessPointId, orderRequestModel.Cost, _orderModel.Status);
        }
        public void addOrderProductToTable(List<int> countTowarList)
        {
            _orderRepository.addToOrderProductTable(_orderModel.OrderID, _orderModel.ProductIDList, countTowarList);
        }


        public void removeProductFromCart()
        {
            _cartService.removeTowarFromCartAfterAddOrder(_orderModel.UserID, _orderModel.ProductIDList);
        }
        public void updateCountProducts(List<int> orderCountTowar, List<int>ProductID)
        {
            for(int i=0; i<ProductID.Count; i++)
            {
                _productService.updateProductCountAfterAddToOrder(orderCountTowar[i], ProductID[i]);
            }
            
        }


    }
}

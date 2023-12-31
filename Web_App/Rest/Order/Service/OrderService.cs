﻿using MySqlX.XDevAPI;
using System.Text.RegularExpressions;
using Web_App.Rest.Cart.Services;
using Web_App.Rest.Order.Model;
using Web_App.Rest.Order.Repository;
using Web_App.Rest.Product.Service;
using Web_App.Rest.User.Models;
using Web_App.Rest.User.Services;
using static MimeDetective.Definitions.Default.FileTypes;

namespace Web_App.Rest.Order.Service
{
    public class OrderService
    {
        private ProductService _productService;
        private CartService _cartService;
        private IOrderRepository _orderRepository;
        private OrderModel _orderModel;
        private UserService _userService;
        private List<int> _badCountsCartItemList;
        public OrderService(IConfiguration configuration)
        {
            _orderRepository = new OrderRepository();
            _orderModel = new OrderModel();
            _productService = new ProductService(configuration);
            _cartService = new CartService();
            _userService = new UserService(configuration);
            _badCountsCartItemList = new List<int>();
        }

        public void fillModel(OrderRequestModel orderRequestModel)
        {
            _orderModel.UserID = orderRequestModel.ClientID;
            _orderModel.ProductIDList = orderRequestModel.TowarIdList;
            _orderModel.OrderComment = orderRequestModel.Ordercom;
            _orderModel.AccessPointID = orderRequestModel.AccessPointId;
            _orderModel.Cost = orderRequestModel.Cost;
            _orderModel.ClientName = orderRequestModel.ClientName;
            _orderModel.ClientLastName = orderRequestModel.ClientLastName;
            _orderModel.Phone = orderRequestModel.Phone;
            if (orderRequestModel.PaymentMethod == "Card")
            {
                _orderModel.Status = "Payment";
            }
            else
                _orderModel.Status = "Waiting for payment...";

        }
        private bool checkCommentLenght(string comment)
        {
            if (comment.Length > 255)
                return false;
            return true;
        }
        private bool checkName(string name)
        {
            if (name.Length > 128 || name.Length == 0)
                return false;
            return true;
        }
        private bool checkLastName(string lastName)
        {
            if (lastName.Length > 255 || lastName.Length == 0)
                return false;
            return true;
        }
        private bool checkPhoneNumber(OrderRequestModel model)
        {
            model.Phone = model.Phone.Trim()
                    .Replace(" ", "")
                    .Replace("-", "")
                    .Replace("(", "")
                    .Replace(")", "");
            return Regex.Match(model.Phone, @"^\+\d{5,15}$").Success;
        }
        public string checkDataOrder(OrderRequestModel model)
        {
            if (!checkCommentLenght(model.Ordercom))
                return "Comment is too long!";
            if (!checkName(model.ClientName))
                return "Firstname is too long!";
            if (!checkLastName(model.ClientLastName))
                return "Lastname is too long!";
            if (!checkPhoneNumber(model))
                return "Bad phone number!";
            return "";

        }
        public string checkTowarCountBeforAdd (OrderRequestModel model)
        {
            fillModel(model);
            for(int i = 0; i<model.TowarIdList.Count; i++)
            {
                if(!_productService.isCountProductCurrent(model.TowarIdList[i], model.TowarCount[i]))
                    _badCountsCartItemList.Add(model.TowarIdList[i]);  
            }
            if (_badCountsCartItemList.Count> 0)
                return "Bad towar count/s!";
            return "";
        }
        public void removeBadTowarCountList()
        {
            _cartService.removeTowarFromCartAfterAddOrder(_orderModel.UserID, _badCountsCartItemList);
        }
        public void addOrderToDB(OrderRequestModel orderRequestModel)
        {

            _orderModel.OrderID = _orderRepository.addOrderAndGetIndex(orderRequestModel.ClientID, orderRequestModel.Ordercom, orderRequestModel.AccessPointId,
                orderRequestModel.Cost, _orderModel.Status, _orderModel.ClientName, _orderModel.ClientLastName, _orderModel.Phone);

        }
        public void addOrderProductToTable(List<int> countTowarList)
        {
            _orderRepository.addToOrderProductTable(_orderModel.OrderID, _orderModel.ProductIDList, countTowarList);
        }


        public void removeProductFromCart()
        {
            _cartService.removeTowarFromCartAfterAddOrder(_orderModel.UserID, _orderModel.ProductIDList);
        }
        public void updateCountProducts(List<int> orderCountTowar, List<int> ProductID) //HERE
        {
            for (int i = 0; i < ProductID.Count; i++)
            {
                _productService.updateProductCountAfterAddToOrder(orderCountTowar[i], ProductID[i]);
            }

        }
        public OrderDetailsModel getOrderDetailsModel(int orderID, int clientID)
        {
            OrderDetailsModel orderDetailsModel = new OrderDetailsModel();
            UserModel userModel = new UserModel();
            orderDetailsModel = _orderRepository.getOrderDetailsByUserIdAndOrderID(orderID, clientID);
            orderDetailsModel.ProductOrderList = getAllProductsInOrder(orderID);
            orderDetailsModel.TotalOrdersClient = _orderRepository.getTotalOrdersClient(clientID);
            userModel = _userService.getUsernamePhotoByID(clientID);
            orderDetailsModel.UserName = userModel.Login;
            orderDetailsModel.ClientPhoto = userModel.Photo;
            return orderDetailsModel;
        }

        private List<OrderDetailsProductModel> getAllProductsInOrder(int orderID)
        {
            List<OrderDetailsProductModel> _modelProducts = new List<OrderDetailsProductModel>();
            _modelProducts = _orderRepository.getAllProductsInOrder(orderID);
            return _modelProducts;

        }
        public List<OrdersUserModel> getOrdersUsers(int userID)
        {
            List<OrdersUserModel> _userOrders = new List<OrdersUserModel>();

            List<OrderDetailsProductModel> products;

            _userOrders = _orderRepository.getAllOrdersUser(userID);
            string productStrting;

            for (int i = 0; i < _userOrders.Count; i++)
            {
                productStrting = "";
                int j = 0;
                products = new List<OrderDetailsProductModel>();
                products = _orderRepository.getAllProductsInOrder(_userOrders[i].OrderID);
                for (; j < products.Count; j++)
                {
                    productStrting = productStrting + ", " + products[j].NameProduct;
                }
                _userOrders[i].ProductsString = productStrting.Remove(0, 2);
            }
            return _userOrders;
        }


        public List<AllOrderAdminModel> getAllOrders()
        {
            List<AllOrderAdminModel> _userOrders = new List<AllOrderAdminModel>();
            _userOrders = _orderRepository.getAllOrders();
            return _userOrders;
        }
        public List<AllOrderAdminModel> getAllOrdersByUserEmail(string email)
        {
            List<AllOrderAdminModel> _userOrders = new List<AllOrderAdminModel>();
            _userOrders = _orderRepository.getAllOrdersByEmail(email);
            return _userOrders;
        }

        public OrderDetailsModel getOrderDetailsModelAdmin(int orderID, string emailUser, string username)
        {

            OrderDetailsModel orderDetailsModel = new OrderDetailsModel();
            UserModel userModel = new UserModel();
            
            if(emailUser != "")
            {
                int clientID = _userService.getIDByEmail(emailUser);
                orderDetailsModel = _orderRepository.getOrderDetailsByUserIdAndOrderID(orderID, clientID);
                orderDetailsModel.ProductOrderList = getAllProductsInOrder(orderID);
                orderDetailsModel.TotalOrdersClient = _orderRepository.getTotalOrdersClient(clientID);
                userModel = _userService.getUsernamePhotoByID(clientID);
                orderDetailsModel.UserName = userModel.Login;
                orderDetailsModel.ClientPhoto = userModel.Photo;
                return orderDetailsModel;
            }
            orderDetailsModel = _orderRepository.getOrderDetailsByUserNameAndOrderID(orderID, username);
            orderDetailsModel.ProductOrderList = _orderRepository.getAllProductsInOrderArchive(orderID);
            orderDetailsModel.TotalOrdersClient = _orderRepository.getTotalOrdersArchiveClient(username);
            orderDetailsModel.UserName = username;
            return orderDetailsModel;


        }
        public void removeOrderAdmin(int orderID)
        {
            _orderRepository.removeOrderByID(orderID);
        }
        public List<AllOrderAdminModel> getAllArchiveOrders()
        {
            List<AllOrderAdminModel> _userOrders = new List<AllOrderAdminModel>();
            _userOrders = _orderRepository.getAllArchiveOrders();
            return _userOrders;
        }
        public List<AllOrderAdminModel> getAllArchiveOrdersByUsername(string username)
        {
            List<AllOrderAdminModel> _userOrders = new List<AllOrderAdminModel>();
            _userOrders = _orderRepository.getAllArchiveOrdersByUsername(username);
            return _userOrders;

        }
        public List<AllOrderAdminModel> getAllOrdersLastDay()
        {
            List<AllOrderAdminModel> _userOrders = new List<AllOrderAdminModel>();
            _userOrders = _orderRepository.getAllOrderLastDay();
            return _userOrders;
        }
        public List<AllOrderAdminModel> getAllOrdersLastMonath()
        {
            List<AllOrderAdminModel> _userOrders = new List<AllOrderAdminModel>();
            _userOrders = _orderRepository.getAllOrderLastMonath();
            return _userOrders;
        }
        public List<AllOrderAdminModel> getAllOrdersLastYear()
        {
            List<AllOrderAdminModel> _userOrders = new List<AllOrderAdminModel>();
            _userOrders = _orderRepository.getAllOrderLastYear();
            return _userOrders;
        }
        public List<AllOrderAdminModel> getAllOrdersToday()
        {
            List<AllOrderAdminModel> _userOrders = new List<AllOrderAdminModel>();
            _userOrders = _orderRepository.getAllOrderThisDay();
            return _userOrders;
        }
        public List<AllOrderAdminModel> getAllOrdersThisMon()
        {
            List<AllOrderAdminModel> _userOrders = new List<AllOrderAdminModel>();
            _userOrders = _orderRepository.getAllOrderThisMonath();
            return _userOrders;
        }
        public List<AllOrderAdminModel> getAllOrdersThisYear()
        {
            List<AllOrderAdminModel> _userOrders = new List<AllOrderAdminModel>();
            _userOrders = _orderRepository.getAllOrderThisYear();
            return _userOrders;
        }
        public List<AllOrderAdminModel> getAllArchiveOrdersRemovedUser()
        {
            List<AllOrderAdminModel> _userOrders = new List<AllOrderAdminModel>();
            _userOrders = _orderRepository.getAllOrderArchiveRemovedUser();
            return _userOrders;
        }
        public List<AllOrderAdminModel> getAllArchiveOrdersPotentialAttack()
        {
            List<AllOrderAdminModel> _userOrders = new List<AllOrderAdminModel>();
            _userOrders = _orderRepository.getAllOrderArchivePotentialAttack();
            return _userOrders;
        }
    }
}

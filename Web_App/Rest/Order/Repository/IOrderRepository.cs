using Web_App.Rest.Order.Model;

namespace Web_App.Rest.Order.Repository
{
    public interface IOrderRepository
    {
        public int addOrderAndGetIndex(int clientID, string comment, int ApID, float cost, string status, string name, string lastname, string tel);
        public void addToOrderProductTable(int orderID, List<int> productID, List<int> countProduct);
        public OrderDetailsModel getOrderDetailsByUserIdAndOrderID(int orderID, int clientID);
        public List<OrderDetailsProductModel> getAllProductsInOrder(int orderID);
        public List<OrdersUserModel> getAllOrdersUser(int userID);
        public int getTotalOrdersClient (int clientID);
        public List<AllOrderAdminModel> getAllOrders();
        public List<AllOrderAdminModel> getAllOrdersByEmail(string email);
        public void removeOrderByID (int orderID);

    }
}

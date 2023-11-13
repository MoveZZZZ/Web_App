using Web_App.Rest.Order.Model;

namespace Web_App.Rest.Order.Repository
{
    public interface IOrderRepository
    {
        public int addOrderAndGetIndex(int clientID, string comment, int ApID, double cost, string status, string name, string lastname, string tel);
        public void addToOrderProductTable(int orderID, List<int> productID, List<int> countProduct);
        public OrderDetailsModel getOrderDetailsByUserIdAndOrderID(int orderID, int clientID);
        public OrderDetailsModel getOrderDetailsByUserNameAndOrderID(int orderID, string username);
        public List<OrderDetailsProductModel> getAllProductsInOrder(int orderID);
        public List<OrderDetailsProductModel> getAllProductsInOrderArchive(int orderID);
        public List<OrdersUserModel> getAllOrdersUser(int userID);
        public int getTotalOrdersClient(int clientID);
        public int getTotalOrdersArchiveClient(string username);
        public List<AllOrderAdminModel> getAllOrders();
        public List<AllOrderAdminModel> getAllOrdersByEmail(string email);
        public void removeOrderByID(int orderID);
        List<AllOrderAdminModel> getAllArchiveOrdersByUsername(string uname);
        public List<AllOrderAdminModel> getAllArchiveOrders();
        public List<AllOrderAdminModel> getAllOrderLastDay();
        public List<AllOrderAdminModel> getAllOrderLastMonath();
        public List<AllOrderAdminModel> getAllOrderLastYear();
        public List<AllOrderAdminModel> getAllOrderThisDay();
        public List<AllOrderAdminModel> getAllOrderThisMonath();
        public List<AllOrderAdminModel> getAllOrderThisYear();

    }
}

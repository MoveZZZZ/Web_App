using Web_App.Rest.Order.Model;

namespace Web_App.Rest.Order.Repository
{
    public interface IOrderRepository
    {
        public int addOrderAndGetIndex(int clientID, string comment, int ApID, float cost, string status);
        public void addToOrderProductTable(int orderID, List<int> productID, List<int> countProduct);
        public OrderDetailsModel getOrderDetailsByUserIdAndOrderID(int orderID, int clientID);
        public List<OrderDetailsProductModel> getAllProductsInOrder(int orderID);

    }
}

using System.Diagnostics.Contracts;

namespace Web_App.Rest.Order.Model
{
    public class OrderDetailsModel
    {
        public int OrderID { get; set; }
        public int ClientID { get; set; }
        public List<OrderDetailsProductModel> ProductOrderList { get; set; }
        public double Cost { get; set; }
        public string ShopAddress { get; set; }
        public string Status { get; set; }

    }
}

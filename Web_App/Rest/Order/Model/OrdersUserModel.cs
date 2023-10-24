namespace Web_App.Rest.Order.Model
{
    public class OrdersUserModel
    {
        public int OrderID { get; set; }
        public string ProductsString { get; set; }
        public DateTime DateTime { get; set; }
        public string Status { get; set; }
    }
}

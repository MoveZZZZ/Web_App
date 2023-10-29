namespace Web_App.Rest.Order.Model
{
    public class OrderModel
    {
        public int OrderID { get; set; }
        public List<int> ProductIDList { get; set; }
        public int UserID { get; set; }
        public string Status { get; set; }
        public string OrderComment { get; set; }
        public int AccessPointID { get; set; }
        public double Cost { get; set; }
    }
}

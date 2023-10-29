namespace Web_App.Rest.Order.Model
{
    public class OrderRequestModel
    {
        public int ClientID { get; set; }
        public List<int> TowarIdList { get; set; }
        public List<int> TowarCount { get; set; }
        public float Cost { get; set; }
        public string Ordercom { get; set; }
        public int AccessPointId { get; set; }
        public string PaymentMethod { get; set; }
    }
}

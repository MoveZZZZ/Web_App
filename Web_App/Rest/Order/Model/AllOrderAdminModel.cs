namespace Web_App.Rest.Order.Model
{
    public class AllOrderAdminModel
    {
        public int OrderID { get; set; }
        public string UserEmail { get; set; }
        public DateTime DateTime { get; set; }
        public string Status { get; set; }
        public byte[] UserPhoto { get; set; }
    }
}

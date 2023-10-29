namespace Web_App.Rest.Cart.Model
{
    public class CartModelRequest
    {
        public int IdClient { get; set; }
        public int IdTowar { get; set; }
        public int TowarCount { get; set; }
    }
}

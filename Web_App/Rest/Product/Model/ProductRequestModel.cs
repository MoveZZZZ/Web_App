namespace Web_App.Rest.Product.Model
{
    public class ProductRequestModel
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int Cost { get; set; }
        public int Count { get; set; }
        public IFormFile Image { get; set; }
    }
}

namespace Web_App.Rest.Product.Model
{
    public class ProductModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public float Cost { get; set; }
        public int Count { get; set; }
        public byte[] ImageUrl { get; set; }

    }
}

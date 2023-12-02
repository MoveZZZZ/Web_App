

namespace Web_App.Rest.Cart.Model
{
    public class CartModelResponse
    {
        public int TowarID { get; set; }
        public string TowarName { get; set; }
        public double TowarPrice { get; set; }
        public int Count { get; set; }  
        public double SumPrice { get; set; }
        public byte[] Image { get; set; }


    }
}

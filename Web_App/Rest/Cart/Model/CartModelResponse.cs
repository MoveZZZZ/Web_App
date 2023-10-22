

namespace Web_App.Rest.Cart.Model
{
    public class CartModelResponse
    {
        public int TowarID { get; set; }
        public string TowarName { get; set; }
        public float TowarPrice { get; set; }
        public int Count { get; set; }  
        public float SumPrice { get; set; }
        public byte[] Image { get; set; }


    }
}

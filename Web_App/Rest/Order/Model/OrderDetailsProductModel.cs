namespace Web_App.Rest.Order.Model
{
    public class OrderDetailsProductModel
    {
        public int IdProduct { get; set; }
        public string NameProduct { get; set; }
        public int CountProduct { get; set; }
        public double ProductCost { get; set; }
        public double ProductCostSummary { get; set; }
        public byte[] ImageUrl { get; set; }
    }
}

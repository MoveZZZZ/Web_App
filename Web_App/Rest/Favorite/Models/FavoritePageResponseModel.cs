namespace Web_App.Rest.Favorite.Models
{
    public class FavoritePageResponseModel
    {
        public int ProductID { get; set; }
        public string ProductName { get; set; }
        public float Cost { get; set; }
        public string Description { get; set; }
        public byte[] ImageUrl { get; set; }

    }
}

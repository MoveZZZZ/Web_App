using Web_App.Rest.Favorite.Models;

namespace Web_App.Rest.Favorite.Repositories
{
    public interface IFavoriteRepository
    {
        public void addToFavorite(int userID, int towarID);
        public void removeFavorite(int userID, int towarID);
        public List<int> getAllFavoriteIndexForUser(int userID);

        public List<FavoritePageResponseModel> getAllFavoritePage(int userID);




    }
}

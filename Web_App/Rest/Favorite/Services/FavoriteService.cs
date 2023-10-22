using Web_App.Rest.Favorite.Models;
using Web_App.Rest.Favorite.Repositories;
using Web_App.Rest.Product.Model;

namespace Web_App.Rest.Favorite.Services
{
    public class FavoriteService
    {
        private IFavoriteRepository _favoriteRepository;


        public FavoriteService()
        {
            _favoriteRepository = new FavoriteRepository();
        }



        public void addToFavorite(FavoriteRequestModel model)
        {
            _favoriteRepository.addToFavorite(model.ClientID, model.TowarId);
        }

        public List<int> getAllIndexesFavoriteClient(int clientId)
        {
            List<int> indexes = new List<int>();  
            indexes=_favoriteRepository.getAllFavoriteIndexForUser(clientId);
            return indexes;
        }

        public void removeFovorite(FavoriteRequestModel model)
        {
            _favoriteRepository.removeFavorite(model.ClientID, model.TowarId);
        }
        public List<FavoritePageResponseModel> getAllUserFavorite(int clientId)
        {
            List<FavoritePageResponseModel> _product = new List<FavoritePageResponseModel>();
            _product = _favoriteRepository.getAllFavoritePage(clientId);

            return _product;
        }
    }
}

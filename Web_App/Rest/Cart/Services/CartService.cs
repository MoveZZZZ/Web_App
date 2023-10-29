using Web_App.Rest.Cart.Model;
using Web_App.Rest.Cart.Repositories;
using ZstdSharp.Unsafe;

namespace Web_App.Rest.Cart.Services
{
    public class CartService
    {
        private ICartRepository _repository;

        public CartService()
        { 
            _repository = new CartRepository();
        }

        public void addTowarInCart (CartModelRequest requestModel)
        {
            _repository.addToCart(requestModel);
        }
        public void removeTowarFromCart(CartModelRequest requestModel)
        {
            _repository.removeFromCartTowar(requestModel);
        }
        public List<CartModelResponse> getCartItem(int userID)
        {
            List<CartModelResponse> response = new List<CartModelResponse>(); 
            response= _repository.getCartListTowar(userID);
            return response;
        }
        public void updateCountTowar(CartModelRequest requestModel)
        {
            _repository.updateCartCountTowar(requestModel);
        }
        public List<int> getCartIndexesUser(int userID)
        {
            List<int> response = new List<int>();
            response = _repository.getListCartIndexes(userID);
            return response;
        }

        public void removeTowarFromCartAfterAddOrder(int userID, List<int> listTowar)
        {
            _repository.RemoveFromCartList(userID, listTowar);
        }

    }
}

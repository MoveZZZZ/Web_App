using Web_App.Rest.Cart.Model;

namespace Web_App.Rest.Cart.Repositories
{
    public interface ICartRepository
    {
        public void addToCart (CartModelRequest cartReqModel);
        public void removeFromCartTowar (CartModelRequest cartReqModel);
        public void updateCartCountTowar(CartModelRequest cartReqModel);
        public List<CartModelResponse> getCartListTowar(int userID);
        public List<int> getListCartIndexes(int userID);
    }
}

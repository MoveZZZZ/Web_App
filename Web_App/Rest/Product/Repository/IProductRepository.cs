using Web_App.Rest.Product.Model;

namespace Web_App.Rest.Product.Repository
{
    public interface IProductRepository
    {
        List<ProductModel> getProductsList(int count, int skip);
        int getTowarsCount();
        public void addTowarInDB(ProductModel model);
        public ProductModel getProductByID(int id);
        public List<ProductModel> getProductsListSearch(string str);
        public void updateProdcutCount(int orderCountProduct, int productID);
        public void updateProduct (ProductModel model);
    }
}

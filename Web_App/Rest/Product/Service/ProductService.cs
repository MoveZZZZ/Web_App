using Web_App.Rest.Authorization.Repositories;
using Web_App.Rest.Product.Model;
using Web_App.Rest.Product.Repository;

namespace Web_App.Rest.Product.Service
{
    public class ProductService
    {
        private IProductRepository _productRepository;

        public ProductService()
        {
            _productRepository = new ProductRepository();
        }


        public int countTotalPages(int pageSize)
        {
            int totalPage = 0;
            int itemsDataBase = _productRepository.getTowarsCount();
            totalPage= (int)Math.Ceiling((double)itemsDataBase / pageSize);
            return totalPage;
        }

        public List<ProductModel> paginatedProduct(int pageSize, int currenPage)
        {
            List<ProductModel> products = new List<ProductModel>();
            products = _productRepository.getProductsList(pageSize, currenPage);

            var paginatedProduct = products
                .Take(pageSize)
                .ToList();
            return paginatedProduct;
        }


        public void addTowar(ProductModel model)
        {
            _productRepository.addTowarInDB(model);
        }



    }
}

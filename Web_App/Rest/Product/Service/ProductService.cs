using Web_App.Rest.Authorization.Repositories;
using Web_App.Rest.Product.Model;
using Web_App.Rest.Product.Repository;
using static System.Net.Mime.MediaTypeNames;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using SixLabors.ImageSharp.Formats.Jpeg;
using Web_App.Rest.User.Services;

namespace Web_App.Rest.Product.Service
{
    public class ProductService
    {
        private IProductRepository _productRepository;
        private UserService _userService;

        public ProductService(IConfiguration _configuration)
        {
            _productRepository = new ProductRepository();
            _userService = new UserService(_configuration);
        }

        public int countTotalPages(int pageSize)
        {
            int itemsDataBase = 0;
            int totalPage = 0;
            try
            {
                itemsDataBase = _productRepository.getTowarsCount();
            }
            catch
            {
                itemsDataBase = 25;
            }
            totalPage = (int)Math.Ceiling((double)itemsDataBase / pageSize);
            return totalPage;
        }

        public List<ProductModel> paginatedProduct(int pageSize, int currenPage)
        {
            List<ProductModel> products = new List<ProductModel>();
            products = _productRepository.getProductsList(pageSize, (currenPage - 1) * pageSize);
            var paginatedProduct = products
                .Take(pageSize)
                .ToList();
            return paginatedProduct;
        }

        public string validateProductData(ProductRequestModel model)
        {
            if (model.Name.Length > 128)
                return "Name has to long!";
            if (model.Description.Length > 16777215)
                return "Description has to long!";
            if (!_userService.IsAllowedFileType(model.Image))
                return "Bad image fromat!";
            if (model.Count <= 0)
                return "Bad count value!";
            if (model.Cost <= 0)
                return "Bad cost value!";
            return "";
        }


        public ProductModel createDBModelProduct(ProductRequestModel model)
        {
            ProductModel createdModel = new ProductModel();
            createdModel.Name = model.Name;
            createdModel.Description = model.Description;
            createdModel.Cost = model.Cost;
            createdModel.Count = model.Count;

            try
            {
                using (var stream = new MemoryStream())
                {
                    model.Image.CopyToAsync(stream);
                    Thread.Sleep(250);
                    byte[] imageData = stream.ToArray();

                    createdModel.ImageUrl = CompressImage(imageData, 1200, 1200, 100);
                }
            }
            catch (Exception ex)
            {

            }
            return createdModel;
        }
        public ProductModel createDBModelProductUpdateProduct(ProductUpdateModel model)
        {
            ProductModel createdModel = new ProductModel();
            createdModel.Id = model.Id;
            createdModel.Name = model.Name;
            createdModel.Description = model.Description;
            createdModel.Cost = model.Cost;
            createdModel.Count = model.Count;
            try
            {
                using (var stream = new MemoryStream())
                {
                    model.Image.CopyToAsync(stream);
                    Thread.Sleep(250);
                    byte[] imageData = stream.ToArray();

                    createdModel.ImageUrl = CompressImage(imageData, 1200, 1200, 100);
                }
            }
            catch (Exception ex)
            {

            }
            return createdModel;
        }
        public ProductModel createDBModelProductUpdateProductWithoutImage(ProductUpdateWithoutImageModel model)
        {
            ProductModel createdModel = new ProductModel();
            createdModel.Id = model.Id;
            createdModel.Name = model.Name;
            createdModel.Description = model.Description;
            createdModel.Cost = model.Cost;
            createdModel.Count = model.Count;
            return createdModel;
        }
        public byte[] CompressImage(byte[] originalImage, int maxWidth, int maxHeight, int quality)
        {
            using (var originalImageStream = new MemoryStream(originalImage))
            using (var compressedImageStream = new MemoryStream())
            {
                using (var image = SixLabors.ImageSharp.Image.Load(originalImageStream))
                {
                    image.Mutate(x => x.Resize(new ResizeOptions
                    {
                        Size = new Size(maxWidth, maxHeight),
                        Mode = ResizeMode.Max
                    }));
                    var jpegEncoder = new JpegEncoder
                    {
                        Quality = quality
                    };
                    image.Save(compressedImageStream, jpegEncoder);
                }

                return compressedImageStream.ToArray();
            }
        }

        public void addTowar(ProductModel model)
        {
            _productRepository.addTowarInDB(model);
        }

        public ProductModel getTowarDetailsByID(int id)
        {
            ProductModel model = new ProductModel();
            model = _productRepository.getProductByID(id);
            return model;

        }
        public List<ProductModel> paginatedProductSearch(string str)
        {

            List<ProductModel> products = new List<ProductModel>();

            products = _productRepository.getProductsListSearch(str);

            var paginatedProduct = products
                .Take(products.Count())
                .ToList();
            return paginatedProduct;
        }

        public void updateProductCountAfterAddToOrder(int orderCountProduct, int productID)
        {
            _productRepository.updateProdcutCount(orderCountProduct, productID);
        }


        public void updateTowar(ProductModel product)
        {
            _productRepository.updateProduct(product);
        }
    }
}

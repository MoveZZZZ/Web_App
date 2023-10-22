using Web_App.Rest.Authorization.Repositories;
using Web_App.Rest.Product.Model;
using Web_App.Rest.Product.Repository;
using static System.Net.Mime.MediaTypeNames;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using SixLabors.ImageSharp.Formats.Jpeg;

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
            int itemsDataBase = 0;
            int totalPage = 0;
            try {
                itemsDataBase= _productRepository.getTowarsCount();
            }
            catch
            {
                itemsDataBase = 25;
            }
            totalPage= (int)Math.Ceiling((double)itemsDataBase / pageSize);
            return totalPage;
        }

        public List<ProductModel> paginatedProduct(int pageSize, int currenPage)
        {
            List<ProductModel> products = new List<ProductModel>();
            products = _productRepository.getProductsList(pageSize, (currenPage-1)*pageSize);
            var paginatedProduct = products
                .Take(pageSize)
                .ToList();
            return paginatedProduct;
        }

        public ProductModel createDBModelProduct(ProductRequestModel model)
        {
            ProductModel createdModel = new ProductModel();
            createdModel.Name=model.Name;
            createdModel.Description=model.Description; 
            createdModel.Cost=model.Cost;
            createdModel.Count=model.Count;

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
        public List<ProductModel> paginatedProductSearch(string str) {

            List<ProductModel> products = new List<ProductModel>();

            products = _productRepository.getProductsListSearch(str);
           
            var paginatedProduct = products
                .Take(products.Count())
                .ToList();
            return paginatedProduct;
        }


    }
}

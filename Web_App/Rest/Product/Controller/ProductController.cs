using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Runtime.CompilerServices;
using Web_App.Rest.JWT.Identity;
using Web_App.Rest.Product.Model;
using Web_App.Rest.Product.Service;

namespace Web_App.Rest.Product.Controller
{
    [Route("products")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        ProductService _productService;
        public ProductsController()
        {
            _productService = new ProductService();
        }

        [HttpGet]
        public IActionResult GetProducts(int page, int pageSize)
        {
            int totalPages = _productService.countTotalPages(pageSize);
            var paginatedProducts = _productService.paginatedProduct(pageSize, page);
            return Ok(new { Products = paginatedProducts, TotalPages = totalPages });
        }

        [HttpGet("search")]
        public IActionResult GetByProductName([FromQuery] string name)
        {
            var paginatedSearch = _productService.paginatedProductSearch(name);
            return Ok(new { Products = paginatedSearch});
        }

        [HttpGet("getproductinfo")]
        public IActionResult GetProductsDetails([FromQuery] int id)
        {
            ProductModel pModelDetails = new ProductModel();
            pModelDetails = _productService.getTowarDetailsByID(id);
            return Ok(pModelDetails);
        }

        [Authorize]
        [RequiresClaim(IdentityData.AdminUserClaimName, "ADMIN")]
        [HttpPost]
        [Route("addproduct")]
        public IActionResult AddProduct([FromForm] ProductRequestModel model)
        {
            ProductModel modelBase = new ProductModel();
            modelBase = _productService.createDBModelProduct(model);
            _productService.addTowar(modelBase);
            return Ok();
        }

    }

}


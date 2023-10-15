using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Runtime.CompilerServices;
using Web_App.Models;

namespace Web_App.Controllers
{
    [Route("products")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetProducts(int page = 1, int pageSize = 25)
        {
            List<ProductModel> products;
            products = new List<ProductModel>();
            for (int i = 1; i <= 78; i++)
            {
                products.Add(new ProductModel
                {
                    Id = i,
                    Name = "Product " + i,
                    Description = "Description for Product " + i,
                    ImageUrl = "product" + i + ".jpg"
                });
            }
            // Calculate the total number of pages
            int totalPages = (int)Math.Ceiling((double)products.Count / pageSize);

            // Get the products for the requested page
            var paginatedProducts = products
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(new { Products = paginatedProducts, TotalPages = totalPages });
        }
        [HttpGet("search")]
        public IActionResult GetByProductName([FromQuery] string name, [FromQuery] int page = 1, [FromQuery] int pageSize = 25)
        {
            List<ProductModel> products;
            products = new List<ProductModel>();
            for (int i = 1; i <= 78; i++)
            {
                products.Add(new ProductModel
                {
                    Id = i,
                    Name = "Product " + i,
                    Description = "Description for Product " + i,
                    ImageUrl = "product" + i + ".jpg"
                });
            }

            IEnumerable<ProductModel> filteredProducts = products
       .Where(product => product.Name.ToLower().Contains(name.ToLower()));

            // Calculate the total number of pages
            int totalItems = filteredProducts.Count();
            int totalPages = (int)Math.Ceiling((double)totalItems / pageSize);

            var paginatedProducts = filteredProducts
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(new { Products = paginatedProducts, TotalPages = totalPages });
        }
    }

}


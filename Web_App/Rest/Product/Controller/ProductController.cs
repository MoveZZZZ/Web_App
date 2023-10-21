﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Runtime.CompilerServices;
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
        public IActionResult GetProducts(int page = 1, int pageSize = 25)
        {
            int totalPages = _productService.countTotalPages(pageSize);
            var paginatedProducts = _productService.paginatedProduct(pageSize, page-1);
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
                    Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." + i,
                    //ImageUrl = "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*"
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
        [HttpGet("getproductinfo")]
        public IActionResult GetProductsDetails([FromQuery] int id)
        {
            ProductModel pModelDetails = new ProductModel();
            pModelDetails = _productService.getTowarDetailsByID(id);

            return Ok(pModelDetails);

        }
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


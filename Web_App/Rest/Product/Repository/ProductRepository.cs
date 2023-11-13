using MySql.Data.MySqlClient;
using MySqlX.XDevAPI.Relational;
using System.Data;
using System.Reflection.PortableExecutable;
using Web_App.Rest.Authorization.Models;
using Web_App.Rest.DataBase.Repositories;
using Web_App.Rest.Product.Model;
using Web_App.Rest.User.Models;

namespace Web_App.Rest.Product.Repository
{
    public class ProductRepository : RepositoryBase, IProductRepository
    {
        public List<ProductModel> getProductsList(int count, int skip)
        {
            List<ProductModel> products = new List<ProductModel>();
            ProductModel product;

            MySqlDataAdapter adapter = new MySqlDataAdapter();
            DataTable table = new DataTable();

            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "SELECT * FROM products LIMIT @count OFFSET @skip";
                command.Parameters.Add("@count", MySqlDbType.Int32).Value = count;
                command.Parameters.Add("@skip", MySqlDbType.Int32).Value = skip;
                adapter.SelectCommand = command;
                adapter.Fill(table);
            }
            foreach (DataRow row in table.Rows)
            {
                product = new ProductModel();
                product.Id = Convert.ToInt32(row[0].ToString());
                product.Name = row[1].ToString();
                product.Description = row[2].ToString();
                product.Cost = Convert.ToDouble(row[3].ToString());
                product.ImageUrl = (byte[])row["image"];
                product.Count = Convert.ToInt32(row[5].ToString());
                products.Add(product);
            }
            return products;
        }
        public int getTowarsCount()
        {
            int towarCount = 0;
            MySqlDataReader dataReader;
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "SELECT COUNT(*) FROM products";
                dataReader = command.ExecuteReader();
                while (dataReader.Read()) { towarCount = Convert.ToInt32(dataReader.GetValue(0).ToString()); }
            }
            return towarCount;
        }
        public void addTowarInDB(ProductModel model)
        {
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "INSERT INTO products(`name`, `description`, `cost`, `image`, `count`) VALUES(@name, @des, @cost, @img, @cnt)";
                command.Parameters.Add("@name", MySqlDbType.VarChar).Value = model.Name;
                command.Parameters.Add("@des", MySqlDbType.TinyText).Value = model.Description;
                command.Parameters.Add("@cost", MySqlDbType.Double).Value = model.Cost;
                command.Parameters.Add("@img", MySqlDbType.Blob).Value = model.ImageUrl;
                command.Parameters.Add("@cnt", MySqlDbType.Int32).Value = model.Count;
                command.ExecuteNonQuery();
            }
        }
        public ProductModel getProductByID(int id)
        {
            ProductModel product = new ProductModel();

            MySqlDataAdapter adapter = new MySqlDataAdapter();
            DataTable table = new DataTable();

            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "SELECT * FROM products WHERE id=@id";
                command.Parameters.Add("@id", MySqlDbType.Int32).Value = id;
                adapter.SelectCommand = command;
                adapter.Fill(table);
            }
            foreach (DataRow row in table.Rows)
            {
                product.Id = Convert.ToInt32(row[0].ToString());
                product.Name = row[1].ToString();
                product.Description = row[2].ToString();
                product.Cost = Convert.ToDouble(row[3].ToString());
                product.ImageUrl = (byte[])row["image"];
                product.Count = Convert.ToInt32(row[5].ToString());
            }
            return product;
        }
        public List<ProductModel> getProductsListSearch(string str)
        {
            List<ProductModel> products = new List<ProductModel>();
            ProductModel product;

            MySqlDataAdapter adapter = new MySqlDataAdapter();
            DataTable table = new DataTable();

            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "SELECT * FROM products WHERE name COLLATE utf8_general_ci LIKE @searchPattern";
                command.Parameters.Add(new MySqlParameter("@searchPattern", MySqlDbType.VarChar) { Value = "%" + str + "%" });
                adapter.SelectCommand = command;
                adapter.Fill(table);
            }
            foreach (DataRow row in table.Rows)
            {
                product = new ProductModel();
                product.Id = Convert.ToInt32(row[0].ToString());
                product.Name = row[1].ToString();
                product.Description = row[2].ToString();
                product.Cost = Convert.ToDouble(row[3].ToString());
                product.ImageUrl = (byte[])row["image"];
                product.Count = Convert.ToInt32(row[5].ToString());
                products.Add(product);
            }
            return products;
        }
        public void updateProdcutCount(int orderCountProduct, int productID)
        {
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "UPDATE products SET count=count-@ordercount WHERE id=@pid";
                command.Parameters.Add("@ordercount", MySqlDbType.Int32).Value = orderCountProduct;
                command.Parameters.Add("@pid", MySqlDbType.Int32).Value = productID;
                command.ExecuteNonQuery();
            }
        }
        public void updateProduct(ProductModel model)
        {
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                if (model.ImageUrl != null)
                {
                    command.CommandText = "UPDATE products SET description=@desc, cost=@cost, image=@img, count=@count WHERE id=@id";
                    command.Parameters.Add("@id", MySqlDbType.Int32).Value = model.Id;
                    command.Parameters.Add("@desc", MySqlDbType.MediumText).Value = model.Description;
                    command.Parameters.Add("@cost", MySqlDbType.Double).Value = model.Cost;
                    command.Parameters.Add("@img", MySqlDbType.LongBlob).Value = model.ImageUrl;
                    command.Parameters.Add("@count", MySqlDbType.Int32).Value = model.Count;
                    command.ExecuteNonQuery();
                }
                else
                {
                    command.CommandText = "UPDATE products SET description=@desc, cost=@cost, count=@count WHERE id=@id";
                    command.Parameters.Add("@id", MySqlDbType.Int32).Value = model.Id;
                    command.Parameters.Add("@desc", MySqlDbType.MediumText).Value = model.Description;
                    command.Parameters.Add("@cost", MySqlDbType.Double).Value = model.Cost;
                    command.Parameters.Add("@count", MySqlDbType.Int32).Value = model.Count;
                    command.ExecuteNonQuery();
                }

            }
        }
        public List<ProductModel> getTop3View()
        {
            List<ProductModel> products = new List<ProductModel>();
            ProductModel product;

            MySqlDataAdapter adapter = new MySqlDataAdapter();
            DataTable table = new DataTable();

            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "SELECT * FROM top_3_products";
                adapter.SelectCommand = command;
                adapter.Fill(table);
            }
            foreach (DataRow row in table.Rows)
            {
                product = new ProductModel();
                product.Id = Convert.ToInt32(row["id"].ToString());
                product.Name = row["name"].ToString();
                product.ImageUrl = (byte[])row["image"];
                products.Add(product);
            }
            return products;
        }
    }
}

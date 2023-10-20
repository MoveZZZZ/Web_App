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
            List <ProductModel> products = new List <ProductModel> ();
            ProductModel product = new ProductModel();

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
                //DataRow rowS = table.Rows[0];
                product.Id = Convert.ToInt32(row[0].ToString());
                product.Name = row[1].ToString();
                product.Description = row[2].ToString();
                product.Cost = Convert.ToInt32(row[3].ToString());
                product.ImageUrl = row[4].ToString();
                products.Add(product);
            }
            return products;
        }
        public int getTowarsCount()
        {
            int towarCount = 0;

            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "SELECT COUNT(*) FROM products";
                MySqlDataReader dataReader = command.ExecuteReader();
                while(dataReader.Read()) { towarCount = Convert.ToInt32(dataReader.GetValue(0).ToString()); }
                connection.Close();
                
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
                command.CommandText = "INSERT INTO products(`name`, `description`, `cost`, `image`, `count`) " +
                    "VALUES(@name, @des, @cost, @img, @cnt)";
                command.Parameters.Add("@name", MySqlDbType.VarChar).Value = model.Name;
                command.Parameters.Add("@des", MySqlDbType.TinyText).Value = model.Description;
                command.Parameters.Add("@cost", MySqlDbType.Int32).Value = model.Cost;
                command.Parameters.Add("@img", MySqlDbType.VarChar).Value = model.ImageUrl;
                command.Parameters.Add("@cnt", MySqlDbType.Int32).Value = model.Count;
                command.ExecuteNonQuery();
            }
        }
    }
}

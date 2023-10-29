using MySql.Data.MySqlClient;
using System.Data;
using Web_App.Rest.Cart.Model;
using Web_App.Rest.DataBase.Repositories;

namespace Web_App.Rest.Cart.Repositories
{
    public class CartRepository : RepositoryBase, ICartRepository
    {
        public void addToCart(CartModelRequest cartReqModel)
        {
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "INSERT INTO cart(`user_id`, `products_id`, `count`) VALUES(@uid, @pid, @count)";
                command.Parameters.Add("@uid", MySqlDbType.Int32).Value = cartReqModel.IdClient;
                command.Parameters.Add("@pid", MySqlDbType.Int32).Value = cartReqModel.IdTowar;
                command.Parameters.Add("@count", MySqlDbType.Int32).Value = cartReqModel.TowarCount;
                command.ExecuteNonQuery();
            }
        }

        public List<CartModelResponse> getCartListTowar(int userID)
        {
            List<CartModelResponse> cartModelResponsesList = new List<CartModelResponse>();
            CartModelResponse cartModelResponse;

            MySqlDataAdapter adapter = new MySqlDataAdapter();
            DataTable table = new DataTable();

            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "SELECT products.id, products.name, products.cost, products.image, cart.count FROM products JOIN cart ON products_id=products.id AND user_id=@uid";
                command.Parameters.Add("@uid", MySqlDbType.Int32).Value = userID;
                adapter.SelectCommand = command;
                adapter.Fill(table);
            }
            foreach (DataRow row in table.Rows)
            {
                cartModelResponse = new CartModelResponse();

                cartModelResponse.TowarID = Convert.ToInt32(row[0].ToString());
                cartModelResponse.TowarName = row[1].ToString();
                cartModelResponse.TowarPrice = (float)Convert.ToDouble(row[2].ToString());
                cartModelResponse.Image = (byte[])row["image"];
                cartModelResponse.Count = Convert.ToInt32(row[4].ToString());
                cartModelResponse.SumPrice = (float)(cartModelResponse.TowarPrice * cartModelResponse.Count);

                cartModelResponsesList.Add(cartModelResponse);

            }
            return cartModelResponsesList;
        }

        public List<int> getListCartIndexes(int userID)
        {
            List<int> indedxes = new List<int>();

            MySqlDataAdapter adapter = new MySqlDataAdapter();
            DataTable table = new DataTable();

            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "SELECT products_id FROM cart WHERE user_id=@uid";
                command.Parameters.Add("@uid", MySqlDbType.Int32).Value = userID;
                adapter.SelectCommand = command;
                adapter.Fill(table);
            }
            foreach (DataRow row in table.Rows)
            {
                int id = Convert.ToInt32(row["products_id"]);
                indedxes.Add(id);
            }
            return indedxes;
        }

        public void RemoveFromCartList(int userID, List<int> listTowar)
        {
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "DELETE FROM cart WHERE user_id=@uid AND products_id=@pid";
                
                foreach (int tempTowarID in listTowar)
                {
                    command.Parameters.Add("@uid", MySqlDbType.Int32).Value = userID;
                    command.Parameters.Add("@pid", MySqlDbType.Int32).Value = tempTowarID;
                    command.ExecuteNonQuery();
                    command.Parameters.Clear();
                }
                
            }
        }

        public void removeFromCartTowar(CartModelRequest cartReqModel)
        {
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "DELETE FROM cart WHERE user_id=@uid AND products_id=@pid";
                command.Parameters.Add("@uid", MySqlDbType.Int32).Value = cartReqModel.IdClient;
                command.Parameters.Add("@pid", MySqlDbType.Int32).Value = cartReqModel.IdTowar;
                command.ExecuteNonQuery();
            }
        }

        public void updateCartCountTowar(CartModelRequest cartReqModel)
        {
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "UPDATE cart SET count=@new_count WHERE user_id=@uid AND products_id=@pid";
                command.Parameters.Add("@uid", MySqlDbType.Int32).Value = cartReqModel.IdClient;
                command.Parameters.Add("@pid", MySqlDbType.Int32).Value = cartReqModel.IdTowar;
                command.Parameters.Add("@new_count", MySqlDbType.Int32).Value = cartReqModel.TowarCount;
                command.ExecuteNonQuery();
            }
        }
    }
}

using MySql.Data.MySqlClient;
using System.Data;
using Web_App.Rest.DataBase.Repositories;
using Web_App.Rest.Favorite.Models;

namespace Web_App.Rest.Favorite.Repositories
{
    public class FavoriteRepository :RepositoryBase, IFavoriteRepository
    {
        public void addToFavorite(int userID, int towarID)
        {
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "INSERT INTO favorite(`user_id`, `products_id`) VALUES(@uid, @pid)";
                command.Parameters.Add("@uid", MySqlDbType.Int32).Value = userID;
                command.Parameters.Add("@pid", MySqlDbType.Int32).Value = towarID;
                command.ExecuteNonQuery();
            }
        }

        public List<int> getAllFavoriteIndexForUser(int userID)
        {
            List<int> indedxes = new List<int>();

            MySqlDataAdapter adapter = new MySqlDataAdapter();
            DataTable table = new DataTable();

            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "SELECT products_id FROM favorite WHERE user_id=@uid";
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

        public List<FavoritePageResponseModel> getAllFavoritePage(int userID)
        {
            List<FavoritePageResponseModel> favoritePageResponseModelList = new List<FavoritePageResponseModel>();
            FavoritePageResponseModel _favoriteResponseModel;


            MySqlDataAdapter adapter = new MySqlDataAdapter();
            DataTable table = new DataTable();
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "SELECT products.id, products.name, products.description, products.cost, products.image FROM products JOIN favorite ON products_id=products.id AND user_id=@uid";
                command.Parameters.Add("@uid", MySqlDbType.Int32).Value = userID;
                adapter.SelectCommand = command;
                adapter.Fill(table);
            }
            foreach (DataRow row in table.Rows)
            {
                _favoriteResponseModel = new FavoritePageResponseModel();
                _favoriteResponseModel.ProductID = Convert.ToInt32(row[0].ToString());
                _favoriteResponseModel.ProductName = row[1].ToString();
                _favoriteResponseModel.Description = row[2].ToString();
                _favoriteResponseModel.Cost = (float)Convert.ToDouble(row[3].ToString());
                _favoriteResponseModel.ImageUrl = (byte[])row["image"];


                favoritePageResponseModelList.Add(_favoriteResponseModel);

            }
            return favoritePageResponseModelList;


        }

        public void removeFavorite(int userID, int towarID)
        {
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "DELETE FROM favorite WHERE user_id=@uid AND products_id=@pid";
                command.Parameters.Add("@uid", MySqlDbType.Int32).Value = userID;
                command.Parameters.Add("@pid", MySqlDbType.Int32).Value = towarID;
                command.ExecuteNonQuery();
            }
        }

    }
}

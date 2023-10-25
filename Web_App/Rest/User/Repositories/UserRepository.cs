using MySql.Data.MySqlClient;
using MySqlX.XDevAPI;
using MySqlX.XDevAPI.Relational;
using System.Data;
using Web_App.Rest.DataBase.Repositories;
using Web_App.Rest.User.Models;

namespace Web_App.Rest.User.Repositories
{
    public class UserRepository : RepositoryBase, IUserRepository
    {
        public void changeAvatarByID(byte[] img, int userID)
        {
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "UPDATE `user` SET photo=@newphoto WHERE id=@uid";
                command.Parameters.Add("@newphoto", MySqlDbType.Blob).Value = img;
                command.Parameters.Add("@uid", MySqlDbType.Int32).Value = userID;
                command.ExecuteNonQuery();
            }
        }

        public UserModel getUnameEmailPhotoByUserID(int userID)
        {
            UserModel user = new UserModel();
            MySqlDataAdapter adapter = new MySqlDataAdapter();
            DataTable table = new DataTable();
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "SELECT username, email, photo FROM `user` WHERE id=@uid";
                command.Parameters.Add("@uid", MySqlDbType.Int32).Value = userID;
                adapter.SelectCommand = command;
                adapter.Fill(table);
            }
            foreach (DataRow row in table.Rows)
            {
                user.Login = row["username"].ToString();
                user.Photo = (byte[])row["photo"];
                user.Email = row["email"].ToString();
            }
            return user;
        }

        public UserModel getUnamePhotoByUserID(int userID)
        {
            UserModel user = new UserModel(); 
            MySqlDataAdapter adapter = new MySqlDataAdapter();
            DataTable table = new DataTable();
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "SELECT username, photo FROM `user` WHERE id=@uid";
                command.Parameters.Add("@uid", MySqlDbType.Int32).Value = userID;
                adapter.SelectCommand = command;
                adapter.Fill(table);
            }
            foreach (DataRow row in table.Rows)
            {
                user.Login = row["username"].ToString();
                user.Photo = (byte[])row["photo"];
            }
            return user;
        }
    }
}

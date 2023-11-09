using MySql.Data.MySqlClient;
using MySqlX.XDevAPI.Relational;
using System.Data;
using System.Net;
using Web_App.Rest.Authorization.Models;
using Web_App.Rest.DataBase.Repositories;
using Web_App.Rest.User.Models;

namespace Web_App.Rest.Authorization.Repositories
{
    public class UserAuthorizationRepository : RepositoryBase, IUserAuthorizationRepository
    {
        public UserModel getUserDataFromDB(AuthorizationModel authModel)
        {
            UserModel userModel = new UserModel();

            MySqlDataAdapter adapter = new MySqlDataAdapter();
            DataTable table = new DataTable();
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "SELECT * FROM user WHERE username = @login";
                command.Parameters.Add("@login", MySqlDbType.VarChar).Value = authModel.Login;
                adapter.SelectCommand = command;
                adapter.Fill(table);
            }
            foreach (DataRow row in table.Rows)
            {
                userModel.Id = Convert.ToInt32(row[0].ToString());
                userModel.Login = row[1].ToString();
                userModel.Password = row[2].ToString();
                userModel.Email = row[3].ToString();
                userModel.Role = row[4].ToString();
                userModel.isBlocked = Convert.ToInt32(row[6].ToString());
            }
            return userModel;
        }

        public bool processAntiAutomationCheckDB(int ID)
        {
            bool response = false;
            MySqlDataAdapter adapter = new MySqlDataAdapter();
            DataTable table = new DataTable();
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "SELECT web_base.sessionTime(@id)";
                command.Parameters.Add("@id", MySqlDbType.Int32).Value = ID;
                response = Convert.ToInt32(command.ExecuteScalar()) == 0 ? false : true;
            }
            return response;
        }

        public void IncrementLoginFailureByID(int user_ID)
        {
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "INSERT INTO login_failures(user_id, time_stamp) VALUES (@id, NOW()); UPDATE user SET blocked = 1 WHERE id=@id AND (SELECT COUNT(*) FROM login_failures WHERE user_id=@id) >= 15";
                command.Parameters.Add("@id", MySqlDbType.Int32).Value = user_ID;
                command.ExecuteNonQuery();
            }
        }

        public UserModel getUserDataFromDBviaID(int userID)
        {
            UserModel userModel = new UserModel();

            MySqlDataAdapter adapter = new MySqlDataAdapter();
            DataTable table = new DataTable();
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "SELECT * FROM user WHERE id = @userID";
                command.Parameters.Add("@userID", MySqlDbType.VarChar).Value = userID;
                adapter.SelectCommand = command;
                adapter.Fill(table);
            }
            foreach (DataRow row in table.Rows)
            {
                userModel.Id = Convert.ToInt32(row[0].ToString());
                userModel.Login = row[1].ToString();
                userModel.Password = row[2].ToString();
                userModel.Email = row[3].ToString();
                userModel.Role = row[4].ToString();
            }
            return userModel;
        }

        public UserModel getUserDataFromDBviaEmail(string email)
        {
            UserModel userModel = new UserModel();

            MySqlDataAdapter adapter = new MySqlDataAdapter();
            DataTable table = new DataTable();
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "SELECT * FROM user WHERE email = @mail";
                command.Parameters.Add("@mail", MySqlDbType.VarChar).Value = email;
                adapter.SelectCommand = command;
                adapter.Fill(table);
            }
            foreach (DataRow row in table.Rows)
            {
                userModel.Id = Convert.ToInt32(row[0].ToString());
                userModel.Login = row[1].ToString();
                userModel.Password = row[2].ToString();
                userModel.Email = row[3].ToString();
                userModel.Role = row[4].ToString();
            }
            return userModel;
        }
    }
}

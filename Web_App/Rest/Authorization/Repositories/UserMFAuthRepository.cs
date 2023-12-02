using MySql.Data.MySqlClient;
using MySqlX.XDevAPI.Relational;
using System.Data;
using System.Net;
using Web_App.Rest.Authorization.Models;
using Web_App.Rest.DataBase.Repositories;
using Web_App.Rest.User.Models;
using Web_App.Rest.DataBase.Repositories;

namespace Web_App.Rest.Authorization.Repositories
{
    public class UserMFAuthRepository : RepositoryBase, IUserMFAuthRepository
    {
        public bool isMfaRequestExists(int user_ID)
        {
            bool isExist;
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "SELECT * FROM mfa_authentication WHERE user_id=@id";
                command.Parameters.Add("@id", MySqlDbType.Int32).Value = user_ID;
                isExist = command.ExecuteScalar() == null ? false : true;
            }
            return isExist;
        }

        public void addOtpIntoTempTable(string uid, string otp, int user_id)
        {
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "INSERT INTO mfa_authentication(`user_id`, `uid`, `code`, `time_stamp`) VALUES(@id, @uid, @code, NOW())";
                command.Parameters.Add("@id", MySqlDbType.Int32).Value = user_id;
                command.Parameters.Add("@uid", MySqlDbType.Text).Value = uid;
                command.Parameters.Add("@code", MySqlDbType.VarChar).Value = otp;
                command.ExecuteNonQuery();
            }
        }

        public bool isUIDExists(string uid)
        {
            bool isUIDExists;
            DataTable table = new DataTable();
            MySqlDataAdapter adapter = new MySqlDataAdapter();
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "SELECT user_id FROM mfa_authentication WHERE uid = @uid";
                command.Parameters.Add("@uid", MySqlDbType.Text).Value = uid;
                isUIDExists = command.ExecuteScalar() == null ? false : true;
            }
            return isUIDExists;
        }

        public bool isCodeValid(string code)
        {
            bool isValid;
            DataTable table = new DataTable();
            MySqlDataAdapter adapter = new MySqlDataAdapter();
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "SELECT user_id FROM mfa_authentication WHERE code = @code";
                command.Parameters.Add("@code", MySqlDbType.VarChar).Value = code;
                isValid = command.ExecuteScalar() == null ? false : true;
            }
            return isValid;
        }

        public UserModel getUserDataViaUID(string uid)
        {
            UserModel userModel = new UserModel();
            MySqlDataAdapter adapter = new MySqlDataAdapter();
            DataTable table = new DataTable();
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "SELECT web_base.user.id, web_base.user.username, web_base.user.password, web_base.user.email, web_base.user.role, web_base.user.photo FROM web_base.user JOIN web_base.mfa_authentication WHERE web_base.user.id = (SELECT user_id FROM web_base.mfa_authentication WHERE uid = @uid)";
                command.Parameters.Add("@uid", MySqlDbType.Text).Value = uid;
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

        public void clearifyingByUID(string uid)
        {
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "DELETE FROM mfa_authentication WHERE uid = @uid";
                command.Parameters.Add("@uid", MySqlDbType.Text).Value = uid;
                command.ExecuteNonQuery();
            }
        }
    }
}

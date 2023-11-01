using MySql.Data.MySqlClient;
using MySqlX.XDevAPI.Relational;
using System.Collections.Generic;
using System.Data;
using System.Net;
using Web_App.Rest.Authorization.Models;
using Web_App.Rest.DataBase.Repositories;
using Web_App.Rest.User.Models;

namespace Web_App.Rest.Authorization.Repositories
{
    public class UserResetPasswordRepository : RepositoryBase, IUserResetPasswordRepository
    {
        UserAuthorizationRepository _userAuthorizationRepository = new UserAuthorizationRepository();
        public void createResetLink(int id, string uid)
        {
            DataTable table = new DataTable();
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "INSERT INTO reset_links(uid, user_id, creation_time) SELECT @uid, @id, NOW() WHERE NOT EXISTS(SELECT * FROM reset_links WHERE user_id = @id LIMIT 1)";
                command.Parameters.Add("@uid", MySqlDbType.Text).Value = uid;
                command.Parameters.Add("@id", MySqlDbType.Int32).Value = id;
                //command.Parameters.Add("@time", MySqlDbType.DateTime).Value = DateTime.Now;
                command.ExecuteNonQuery();
            }
        }

        public bool isRequestForIdExists(int user_ID)
        {
            bool isExist;
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "SELECT * FROM reset_links WHERE user_id=@id";
                command.Parameters.Add("@id", MySqlDbType.Int32).Value = user_ID;
                isExist = command.ExecuteScalar() == null ? false : true;
            }
            return isExist;
        }

        public bool isUIDExist(string uid)
        {
            bool isUIDExist;
            DataTable table = new DataTable();
            MySqlDataAdapter adapter = new MySqlDataAdapter();
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "SELECT user_id FROM reset_links WHERE uid = @uid";
                command.Parameters.Add("@uid", MySqlDbType.Text).Value = uid;
                isUIDExist = command.ExecuteScalar() == null ? false : true;
            }
            return isUIDExist;
        }
        public void updatePasswordUser(string uid, string password)
        {
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "UPDATE user SET password = @pass WHERE id = (SELECT user_id FROM `reset_links` WHERE `reset_links`.uid=@uid); DELETE FROM `reset_links` WHERE uid=@uid";
                command.Parameters.Add("@pass", MySqlDbType.Text).Value = password;
                command.Parameters.Add("@uid", MySqlDbType.Text).Value = uid;
                command.ExecuteNonQuery();
            }
        }
    }
}

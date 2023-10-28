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

        public int getResetUserIDViaUID(string uid)
        {
            int result = 0;
            DataTable table = new DataTable();
            MySqlDataAdapter adapter = new MySqlDataAdapter();
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "SELECT user_id FROM reset_links WHERE uid = @uid";
                command.Parameters.Add("@uid", MySqlDbType.Text).Value = uid;
                adapter.SelectCommand = command;
                adapter.Fill(table);
            }
            foreach (DataRow row in table.Rows)
            {
                result = Convert.ToInt32(row["user_id"].ToString());
            }
            return result;
        }
    }
}

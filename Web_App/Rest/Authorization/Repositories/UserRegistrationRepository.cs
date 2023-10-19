using Web_App.Rest.Authorization.Models;
using Web_App.Rest.DataBase.Repositories;
using MySql.Data.MySqlClient;

namespace Web_App.Rest.Authorization.Repositories
{
    public class UserRegistrationRepository : RepositoryBase, IUserRegistrationRepository
    {
        public void addUserInDB(RegisterModel registerModel)
        {
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "INSERT INTO user(`username`, `password`, `email`, `role`) VALUES(@uname, @pass, @email, @role)";
                command.Parameters.Add("@uname", MySqlDbType.VarChar).Value = registerModel.Login;
                command.Parameters.Add("@pass", MySqlDbType.VarChar).Value = registerModel.Password;
                command.Parameters.Add("@email", MySqlDbType.VarChar).Value = registerModel.Email;
                command.Parameters.Add("@role", MySqlDbType.VarChar).Value = "USER";
                command.ExecuteNonQuery();
            }
        }

        public MySqlDataReader getByUsernameFromDB(string registerUsername)
        {
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "SELECT * FROM user WHERE username = @uname";
                command.Parameters.Add("@uname", MySqlDbType.VarChar).Value = registerUsername;
                MySqlDataReader getedData = command.ExecuteReader();
                return getedData;
            }
            
        }
    }
}

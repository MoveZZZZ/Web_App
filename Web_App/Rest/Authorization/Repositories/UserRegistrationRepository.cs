using Web_App.Rest.Authorization.Models;
using Web_App.Rest.DataBase.Repositories;
using MySql.Data.MySqlClient;
using System.Data;

namespace Web_App.Rest.Authorization.Repositories
{
    public class UserRegistrationRepository : RepositoryBase, IUserRegistrationRepository
    {
        public void addUserInDB(RegisterModel registerModel, byte[] img)
        {
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "INSERT INTO user(`username`, `password`, `email`, `role`, `photo`) VALUES(@uname, @pass, @email, @role, @photo)";
                command.Parameters.Add("@uname", MySqlDbType.VarChar).Value = registerModel.Login;
                command.Parameters.Add("@pass", MySqlDbType.VarChar).Value = registerModel.Password;
                command.Parameters.Add("@email", MySqlDbType.VarChar).Value = registerModel.Email;
                command.Parameters.Add("@role", MySqlDbType.VarChar).Value = "USER";
                command.Parameters.Add("@photo", MySqlDbType.TinyBlob).Value = img;
                command.ExecuteNonQuery();
            }
        }

        public DataTable getByEmailFromDB(string email)
        {
            DataTable result = new DataTable();
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "SELECT * FROM user WHERE email = @email";
                command.Parameters.Add("@email", MySqlDbType.VarChar).Value = email;
                MySqlDataReader getedData = command.ExecuteReader();
                using (getedData)
                    result.Load(getedData);
            }
            return result;
        }

        public DataTable getByUsernameFromDB(string username)
        {
            DataTable result = new DataTable();
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "SELECT * FROM user WHERE username = @uname";
                command.Parameters.Add("@uname", MySqlDbType.VarChar).Value = username;
                MySqlDataReader getedData = command.ExecuteReader();
                using (getedData)
                    result.Load(getedData);

            }
            return result;

        }


        public void addUserInTempDB(RegisterModel registerModel, string uid)
        {
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "INSERT INTO user_registration(`username`, `password`, `email`, `uid`, `time_stamp`) VALUES(@uname, @pass, @email, @uid, NOW())";
                command.Parameters.Add("@uname", MySqlDbType.VarChar).Value = registerModel.Login;
                command.Parameters.Add("@pass", MySqlDbType.VarChar).Value = registerModel.Password;
                command.Parameters.Add("@email", MySqlDbType.VarChar).Value = registerModel.Email;
                command.Parameters.Add("@uid", MySqlDbType.Text).Value = uid;
                command.ExecuteNonQuery();
            }
        }


        public bool checkUsernameFromTempTable(string username)
        {
            bool isExist;
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "SELECT * FROM user_registration WHERE username=@uname";
                command.Parameters.Add("@uname", MySqlDbType.VarChar).Value = username;
                isExist = command.ExecuteScalar() == null ? false : true;
            }
            return isExist;
        }

        public bool checkEmailFromTempTable(string email)
        {
            bool isExist;
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "SELECT * FROM user_registration WHERE email=@mail";
                command.Parameters.Add("@mail", MySqlDbType.VarChar).Value = email;
                isExist = command.ExecuteScalar() == null ? false : true;
            }
            return isExist;
        }


        public void addUserInDBAfterCheckUID(string uid, byte[] img)
        {
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "INSERT INTO user(`username`, `password`, `email`, `role`, `photo`, `blocked`) SELECT username, password, email, @role, @photo, 0 FROM `user_registration` WHERE uid=@uid; DELETE FROM user_registration WHERE uid=@uid";
                command.Parameters.Add("@uid", MySqlDbType.Text).Value = uid;
                command.Parameters.Add("@role", MySqlDbType.VarChar).Value = "USER";
                command.Parameters.Add("@photo", MySqlDbType.TinyBlob).Value = img;
                command.ExecuteNonQuery();
            }
        }
        public bool isUIDExist(string uid)
        {
            bool isExist;
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "SELECT * FROM user_registration WHERE uid=@uid";
                command.Parameters.Add("@uid", MySqlDbType.Text).Value = uid;
                isExist = command.ExecuteScalar() == null ? false : true;
            }
            return isExist;
        }
    }
}

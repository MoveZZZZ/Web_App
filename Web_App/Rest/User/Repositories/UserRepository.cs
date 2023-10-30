﻿using MySql.Data.MySqlClient;
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
        public UserModel getDataUser(int userID)
        {
            UserModel user = new UserModel();
            MySqlDataAdapter adapter = new MySqlDataAdapter();
            DataTable table = new DataTable();
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "SELECT username, password, email FROM `user` WHERE id=@uid";
                command.Parameters.Add("@uid", MySqlDbType.Int32).Value = userID;
                adapter.SelectCommand = command;
                adapter.Fill(table);
            }
            foreach (DataRow row in table.Rows)
            {
                user.Login = row["username"].ToString();
                user.Password = row["password"].ToString();
                user.Email = row["email"].ToString();
            }
            return user;
        }

        public void changeEmailNameByID(int userID, string email)
        {
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "UPDATE `user` SET email=@newemail WHERE id=@uid";
                command.Parameters.Add("@newemail", MySqlDbType.VarChar).Value = email;
                command.Parameters.Add("@uid", MySqlDbType.Int32).Value = userID;
                command.ExecuteNonQuery();
            }
        }

        public void changePasswordByID(int userID, string password)
        {
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "UPDATE `user` SET password=@newpassword WHERE id=@uid";
                command.Parameters.Add("@newpassword", MySqlDbType.VarChar).Value = password;
                command.Parameters.Add("@uid", MySqlDbType.Int32).Value = userID;
                command.ExecuteNonQuery();
            }
        }

        public void changeUserNameByID(int userID, string userName)
        {
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "UPDATE `user` SET username=@newusername WHERE id=@uid";
                command.Parameters.Add("@newusername", MySqlDbType.VarChar).Value = userName;
                command.Parameters.Add("@uid", MySqlDbType.Int32).Value = userID;
                command.ExecuteNonQuery();
            }
        }

        public void deleteAccountByID(int userID)
        {
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "DELETE FROM `user` WHERE id=@uid";
                command.Parameters.Add("@uid", MySqlDbType.Int32).Value = userID;
                command.ExecuteNonQuery();
            }
        }
        public int getIDByEmail(string email)
        {
            int ID = 0;
            MySqlDataAdapter adapter = new MySqlDataAdapter();
            DataTable table = new DataTable();
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "SELECT id FROM `user` WHERE email=@umail";
                command.Parameters.Add("@umail", MySqlDbType.VarChar).Value = email;
                adapter.SelectCommand = command;
                adapter.Fill(table);
            }
            foreach (DataRow row in table.Rows)
            {
                ID = Convert.ToInt32(row["id"].ToString());
            }
            return ID;
        }
    }
}

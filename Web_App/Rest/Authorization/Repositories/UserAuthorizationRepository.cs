﻿using MySql.Data.MySqlClient;
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
            }
            return userModel;
        }
    }
}
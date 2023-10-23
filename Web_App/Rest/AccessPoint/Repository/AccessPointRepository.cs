using MySql.Data.MySqlClient;
using System.Data;
using Web_App.Rest.AccessPoint.Model;
using Web_App.Rest.DataBase.Repositories;
using Web_App.Rest.Product.Model;

namespace Web_App.Rest.AccessPoint.Repository
{
    public class AccessPointRepository : RepositoryBase, IAccessPointRepository
    {
        public List<AccessPointModel> GetAllAccessPointStateAndCity(string state, string city)
        {
            List<AccessPointModel> list = new List<AccessPointModel>();
            AccessPointModel accessModel;

            MySqlDataAdapter adapter = new MySqlDataAdapter();
            DataTable table = new DataTable();

            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "SELECT * FROM access_point WHERE state=@state AND city=@city ";
                command.Parameters.Add("@city", MySqlDbType.VarChar).Value = city;
                command.Parameters.Add("@state", MySqlDbType.VarChar).Value = state;
                adapter.SelectCommand = command;
                adapter.Fill(table);
            }
            foreach (DataRow row in table.Rows)
            {
                
                accessModel = new AccessPointModel();
                
                accessModel.ID= Convert.ToInt32(row["id"]);
                accessModel.Name = row["name"].ToString();
                accessModel.State = row["state"].ToString();
                accessModel.City = row["city"].ToString();
                accessModel.Street = row["street"].ToString();
                accessModel.BuildingNumber = row["building_num"].ToString();
                accessModel.PostIndex = row["post_index"].ToString();
                list.Add(accessModel);
            }
            return list;
        }

        public List<AccessPointModel> GetAllAccessPointState(string state)
        {
            List<AccessPointModel> list = new List<AccessPointModel>();
            AccessPointModel accessModel;

            MySqlDataAdapter adapter = new MySqlDataAdapter();
            DataTable table = new DataTable();

            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "SELECT * FROM access_point WHERE state=@state";
                command.Parameters.Add("@state", MySqlDbType.VarChar).Value = state;
                adapter.SelectCommand = command;
                adapter.Fill(table);
            }
            foreach (DataRow row in table.Rows)
            {

                accessModel = new AccessPointModel();

                accessModel.ID = Convert.ToInt32(row["id"]);
                accessModel.Name = row["name"].ToString();
                accessModel.State = row["state"].ToString();
                accessModel.City = row["city"].ToString();
                accessModel.Street = row["street"].ToString();
                accessModel.BuildingNumber = row["building_num"].ToString();
                accessModel.PostIndex = row["post_index"].ToString();
                list.Add(accessModel);
            }
            return list;
        }

        public List<string> GetAllCityAccessPoint()
        {
            List<string> list = new List<string>();
            string temp;

            MySqlDataAdapter adapter = new MySqlDataAdapter();
            DataTable table = new DataTable();

            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "SELECT city FROM access_point ";
                adapter.SelectCommand = command;
                adapter.Fill(table);
            }
            foreach (DataRow row in table.Rows)
            {
                temp = row["city"].ToString();
                list.Add(temp);
                temp = "";
            }
            return list;
        }

        public List<string> GetAllCitysAPTheState(string state)
        {
            List<string> list = new List<string>();
            string temp;

            MySqlDataAdapter adapter = new MySqlDataAdapter();
            DataTable table = new DataTable();

            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "SELECT city FROM access_point WHERE state=@state";
                command.Parameters.Add("@state", MySqlDbType.VarChar).Value = state;
                adapter.SelectCommand = command;
                adapter.Fill(table);
            }
            foreach (DataRow row in table.Rows)
            {
                temp = row["city"].ToString();
                list.Add(temp);
                temp = "";
            }
            return list;
        }

        public List<string> GetAllStateAccessPoint()
        {
            List<string> list = new List<string>();
            string temp;

            MySqlDataAdapter adapter = new MySqlDataAdapter();
            DataTable table = new DataTable();

            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "SELECT state FROM access_point ";
                adapter.SelectCommand = command;
                adapter.Fill(table);
            }
            foreach (DataRow row in table.Rows)
            {
                temp = row["state"].ToString();
                list.Add(temp);
                temp = "";
            }
            return list;
        }
    }
}

//Удалить товары из карта+, добавить order+, добавить продукты в order в таблицу products_order+, уменьшить кол-во товаров в product+

using Google.Protobuf.WellKnownTypes;
using MySql.Data.MySqlClient;
using MySqlX.XDevAPI;
using System.Data;
using System.Xml.Linq;
using Web_App.Rest.DataBase.Repositories;
using Web_App.Rest.Product.Model;

namespace Web_App.Rest.Order.Repository
{
    public class OrderRepository : RepositoryBase, IOrderRepository
    {
        public int addOrderAndGetIndex(int clientID, string comment, int ApID, float cost, string status)
        {
            MySqlDataAdapter adapter = new MySqlDataAdapter();
            DataTable table = new DataTable();
            int orderID = 0;
           // List<int> ordzerID = new List<int>();
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "INSERT INTO `order`(`user_id`, `status`, `ordercom`, `access_point_id`, `cost`) VALUES (@uid, @status, @com, @apid, @cost); SELECT LAST_INSERT_ID()";
                command.Parameters.Add("@uid", MySqlDbType.Int32).Value = clientID;
                command.Parameters.Add("@status", MySqlDbType.String).Value = status;
                command.Parameters.Add("@com", MySqlDbType.String).Value = comment;
                command.Parameters.Add("@apid", MySqlDbType.Int32).Value = ApID;
                command.Parameters.Add("@cost", MySqlDbType.Float).Value = cost;
                adapter.SelectCommand = command;
                adapter.Fill(table);
                foreach (DataRow row in table.Rows)
                {
                    orderID = Convert.ToInt32(row[0].ToString());
                }
                connection.Close();
            }
            return orderID;
        }
        public void addToOrderProductTable(int orderID, List<int> productIDList, List<int> countProduct)
        {
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "INSERT INTO products_order(`order_id`, `product_id`, `count`) VALUES(@orderid, @productid, @count)";
                
                for (int i =0; i< productIDList.Count;i++)
                {
                    command.Parameters.Add("@orderid", MySqlDbType.Int32).Value = orderID;
                    command.Parameters.Add("@productid", MySqlDbType.Int32).Value = productIDList[i];
                    command.Parameters.Add("@count", MySqlDbType.Int32).Value = countProduct[i];
                    command.ExecuteNonQuery();
                    command.Parameters.Clear();
                }

            }
        }
    }
}

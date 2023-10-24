using Google.Protobuf.WellKnownTypes;
using MySql.Data.MySqlClient;
using MySqlX.XDevAPI;
using System.Data;
using System.Security.Cryptography.X509Certificates;
using System.Xml.Linq;
using Web_App.Rest.DataBase.Repositories;
using Web_App.Rest.Order.Model;
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
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "INSERT INTO `order`(`user_id`, `status`, `ordercom`, `access_point_id`, `cost`, `order_create`) VALUES (@uid, @status, @com, @apid, @cost, @ocreate); SELECT LAST_INSERT_ID()";
                command.Parameters.Add("@uid", MySqlDbType.Int32).Value = clientID;
                command.Parameters.Add("@status", MySqlDbType.String).Value = status;
                command.Parameters.Add("@com", MySqlDbType.String).Value = comment;
                command.Parameters.Add("@apid", MySqlDbType.Int32).Value = ApID;
                command.Parameters.Add("@cost", MySqlDbType.Float).Value = cost;
                command.Parameters.Add("@ocreate", MySqlDbType.Date).Value = DateTime.UtcNow.Date;
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

                for (int i = 0; i < productIDList.Count; i++)
                {
                    command.Parameters.Add("@orderid", MySqlDbType.Int32).Value = orderID;
                    command.Parameters.Add("@productid", MySqlDbType.Int32).Value = productIDList[i];
                    command.Parameters.Add("@count", MySqlDbType.Int32).Value = countProduct[i];
                    command.ExecuteNonQuery();
                    command.Parameters.Clear();
                }

            }
        }

        public List<OrdersUserModel> getAllOrdersUser(int userID)
        {
            List<OrdersUserModel> _data = new List<OrdersUserModel>();
            OrdersUserModel _model;


            MySqlDataAdapter adapter = new MySqlDataAdapter();
            DataTable table = new DataTable();
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "SELECT order_id, status, order_create FROM `order` WHERE user_id=@uid";
                command.Parameters.Add("@uid", MySqlDbType.Int32).Value = userID;
                adapter.SelectCommand = command;
                adapter.Fill(table);
            }
            foreach (DataRow row in table.Rows) { 
                _model = new OrdersUserModel();
                _model.OrderID = Convert.ToInt32(row["order_id"].ToString());
                _model.Status = row["status"].ToString();
                _model.DateTime= Convert.ToDateTime(row["order_create"].ToString());
                _data.Add( _model );
            }
            return _data;
        }

        public List<OrderDetailsProductModel> getAllProductsInOrder(int orderID)
        {
            List<OrderDetailsProductModel> _modelList = new List<OrderDetailsProductModel>();
            OrderDetailsProductModel _model;
            MySqlDataAdapter adapter = new MySqlDataAdapter();
            DataTable table = new DataTable();
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "SELECT products.id, products.name, products_order.count ,products.image FROM products_order JOIN products ON products_order.product_id=products.id WHERE products_order.order_id=@orderid";
                command.Parameters.Add("@orderid", MySqlDbType.Int32).Value = orderID;
                adapter.SelectCommand = command;
                adapter.Fill(table);
            }
            foreach (DataRow row in table.Rows)
            {
                _model = new OrderDetailsProductModel();
                _model.IdProduct = Convert.ToInt32(row["id"].ToString());
                _model.NameProduct = row["name"].ToString();
                _model.CountProduct = Convert.ToInt32(row["count"].ToString());
                _model.ImageUrl = (byte[])row["image"];
                _modelList.Add(_model);
            }
            return _modelList;
        }

        public OrderDetailsModel getOrderDetailsByUserIdAndOrderID(int orderID, int clientID)
        {
            OrderDetailsModel orderModel = new OrderDetailsModel();

            MySqlDataAdapter adapter = new MySqlDataAdapter();
            DataTable table = new DataTable();
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "SELECT `order`.status, `order`.cost, access_point.state, access_point.city, access_point.street, access_point.building_num, access_point.post_index FROM `order` JOIN access_point ON `order`.access_point_id=access_point.id WHERE `order`.order_id=@orderid AND `order`.user_id=@userid;";
                command.Parameters.Add("@orderid", MySqlDbType.Int32).Value = orderID;
                command.Parameters.Add("@userid", MySqlDbType.Int32).Value = clientID;
                adapter.SelectCommand = command;
                adapter.Fill(table);
            }
            foreach (DataRow row in table.Rows)
            {
                orderModel.ClientID = clientID;
                orderModel.OrderID = orderID;
                orderModel.Status = row["status"].ToString();
                orderModel.Cost = (float)Convert.ToDouble(row["cost"].ToString());
                orderModel.ShopAddress = row["building_num"].ToString() + " " + row["street"].ToString() + " St. "
                    + row["city"].ToString() + " " + row["post_index"].ToString() + " " + row["state"].ToString();

            }
            return orderModel;

        }
    }
}

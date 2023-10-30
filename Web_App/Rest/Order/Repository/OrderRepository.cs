using Google.Protobuf.WellKnownTypes;
using MySql.Data.MySqlClient;
using MySqlX.XDevAPI;
using MySqlX.XDevAPI.Relational;
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
        public int addOrderAndGetIndex(int clientID, string comment, int ApID, float cost, string status, string name, string lastname, string tel)
        {
            MySqlDataAdapter adapter = new MySqlDataAdapter();
            DataTable table = new DataTable();
            int orderID = 0;
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "INSERT INTO `order`(`user_id`, `status`, `ordercom`, `access_point_id`, `cost`, `order_create`, `client_name`, `client_lastname`, `client_phone`) VALUES (@uid, @status, @com, @apid, @cost, @ocreate, @cname, @clastname, @tel); SELECT LAST_INSERT_ID()";
                command.Parameters.Add("@uid", MySqlDbType.Int32).Value = clientID;
                command.Parameters.Add("@status", MySqlDbType.String).Value = status;
                command.Parameters.Add("@com", MySqlDbType.String).Value = comment;
                command.Parameters.Add("@apid", MySqlDbType.Int32).Value = ApID;
                command.Parameters.Add("@cost", MySqlDbType.Float).Value = cost;
                command.Parameters.Add("@ocreate", MySqlDbType.Date).Value = DateTime.UtcNow.Date;
                command.Parameters.Add("@cname", MySqlDbType.VarChar).Value = name;
                command.Parameters.Add("@clastname", MySqlDbType.VarChar).Value = lastname;
                command.Parameters.Add("@tel", MySqlDbType.VarChar).Value = tel;

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

        public List<AllOrderAdminModel> getAllOrders()
        {
            List<AllOrderAdminModel> _data = new List<AllOrderAdminModel>();
            AllOrderAdminModel _model;


            MySqlDataAdapter adapter = new MySqlDataAdapter();
            DataTable table = new DataTable();
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "SELECT order_id, user.email, status, order_create, user.photo FROM `order` JOIN user ON `order`.user_id = user.id WHERE user_id>0";
                adapter.SelectCommand = command;
                adapter.Fill(table);
            }
            foreach (DataRow row in table.Rows)
            {
                _model = new AllOrderAdminModel();
                _model.OrderID = Convert.ToInt32(row["order_id"].ToString());
                _model.UserEmail = row["email"].ToString();
                _model.Status = row["status"].ToString();
                _model.DateTime = Convert.ToDateTime(row["order_create"].ToString());
                _model.UserPhoto = (byte[])row["photo"];
                _data.Add(_model);
            }
            return _data;
        }

        public List<AllOrderAdminModel> getAllOrdersByEmail(string email)
        {
            List<AllOrderAdminModel> _data = new List<AllOrderAdminModel>();
            AllOrderAdminModel _model;


            MySqlDataAdapter adapter = new MySqlDataAdapter();
            DataTable table = new DataTable();
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "SELECT order_id, user.email, status, order_create, user.photo FROM `order` JOIN user ON `order`.user_id = user.id WHERE user.email COLLATE utf8_general_ci LIKE @searchPattern";
                command.Parameters.Add(new MySqlParameter("@searchPattern", MySqlDbType.VarChar) { Value = "%" + email + "%" });
                adapter.SelectCommand = command;
                adapter.Fill(table);
            }
            foreach (DataRow row in table.Rows)
            {
                _model = new AllOrderAdminModel();
                _model.OrderID = Convert.ToInt32(row["order_id"].ToString());
                _model.UserEmail = row["email"].ToString();
                _model.Status = row["status"].ToString();
                _model.DateTime = Convert.ToDateTime(row["order_create"].ToString());
                _model.UserPhoto = (byte[])row["photo"];
                _data.Add(_model);
            }
            return _data;
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
            foreach (DataRow row in table.Rows)
            {
                _model = new OrdersUserModel();
                _model.OrderID = Convert.ToInt32(row["order_id"].ToString());
                _model.Status = row["status"].ToString();
                _model.DateTime = Convert.ToDateTime(row["order_create"].ToString());
                _data.Add(_model);
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
                command.CommandText = "SELECT products.id, products.name, products_order.count, products.cost ,products.image FROM products_order JOIN products ON products_order.product_id=products.id WHERE products_order.order_id=@orderid";
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
                _model.ProductCost = (float)Convert.ToDouble(row["cost"].ToString());
                _model.ProductCostSummary = (float)(Convert.ToDouble(row["cost"].ToString()) * Convert.ToInt32(row["count"].ToString()));
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
                command.CommandText = "SELECT `order`.status, `order`.cost, `order`.client_name, `order`.client_lastname, `order`.client_phone, access_point.state, access_point.city, access_point.street, access_point.building_num, access_point.post_index FROM `order` JOIN access_point ON `order`.access_point_id=access_point.id WHERE `order`.order_id=@orderid AND `order`.user_id=@userid;";
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
                orderModel.ClientName = row["client_name"].ToString();
                orderModel.ClientLastname = row["client_lastname"].ToString();
                orderModel.Phones = row["client_phone"].ToString();
                orderModel.ShopAddress = row["building_num"].ToString() + " " + row["street"].ToString() + " St. "
                    + row["city"].ToString() + " " + row["post_index"].ToString() + " " + row["state"].ToString();

            }
            return orderModel;

        }

        public int getTotalOrdersClient(int clientID)
        {
            int totalOrdersClient = 0;
            MySqlDataAdapter adapter = new MySqlDataAdapter();
            DataTable table = new DataTable();
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "SELECT COUNT(order_id) FROM `order` WHERE user_id=@uid";
                command.Parameters.Add("@uid", MySqlDbType.Int32).Value = clientID;
                adapter.SelectCommand = command;
                adapter.Fill(table);
            }
            foreach (DataRow row in table.Rows)
            {
                totalOrdersClient = Convert.ToInt32(row[0].ToString());
            }
            return totalOrdersClient;
        }


        public void removeOrderByID(int orderID)
        {
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "DELETE FROM `order` WHERE order_id=@orderid";
                command.Parameters.Add("@orderid", MySqlDbType.Int32).Value = orderID;
                command.ExecuteNonQuery();
            }
        }
    }
}

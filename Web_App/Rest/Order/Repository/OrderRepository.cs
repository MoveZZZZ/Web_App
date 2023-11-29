using Google.Protobuf.WellKnownTypes;
using MySql.Data.MySqlClient;
using MySqlX.XDevAPI;
using MySqlX.XDevAPI.Relational;
using System.Data;
using System.Reflection.Metadata;
using System.Security.Cryptography.X509Certificates;
using System.Xml.Linq;
using Web_App.Rest.DataBase.Repositories;
using Web_App.Rest.Order.Model;
using Web_App.Rest.Product.Model;
using static MimeDetective.Definitions.Default.FileTypes;

namespace Web_App.Rest.Order.Repository
{
    public class OrderRepository : RepositoryBase, IOrderRepository
    {
        public int addOrderAndGetIndex(int clientID, string comment, int ApID, double cost, string status, string name, string lastname, string tel)
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
                command.Parameters.Add("@cost", MySqlDbType.Double).Value = cost;
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

        public List<AllOrderAdminModel> getAllArchiveOrders()
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
                command.CommandText = "SELECT order_id, username, date_create, comment FROM `order_removed_user`";
                adapter.SelectCommand = command;
                adapter.Fill(table);
            }
            foreach (DataRow row in table.Rows)
            {
                _model = new AllOrderAdminModel();
                _model.OrderID = Convert.ToInt32(row["order_id"].ToString());
                _model.UserEmail = row["username"].ToString();
                _model.Status = row["comment"].ToString();
                _model.DateTime = Convert.ToDateTime(row["date_create"].ToString());
                _data.Add(_model);
            }
            return _data;
        }
        public List<AllOrderAdminModel> getAllArchiveOrdersByUsername(string uname)
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
                command.CommandText = "SELECT * FROM `order_removed_user` WHERE username COLLATE utf8_general_ci LIKE @searchPattern";
                command.Parameters.Add(new MySqlParameter("@searchPattern", MySqlDbType.VarChar) { Value = "%" + uname + "%" });
                adapter.SelectCommand = command;
                adapter.Fill(table);
            }
            foreach (DataRow row in table.Rows)
            {
                _model = new AllOrderAdminModel();
                _model.OrderID = Convert.ToInt32(row["order_id"].ToString());
                _model.UserEmail = row["username"].ToString();
                _model.Status = "Arvhive";
                _model.DateTime = Convert.ToDateTime(row["date_create"].ToString());
                _data.Add(_model);
            }
            return _data;
        }

        public List<AllOrderAdminModel> getAllOrderLastDay()
        {
            List<AllOrderAdminModel> _data = new List<AllOrderAdminModel>();
            AllOrderAdminModel _model;

            DateTime today = DateTime.Now.Date;
            DateTime yesterday = today.AddDays(-1);

            MySqlDataAdapter adapter = new MySqlDataAdapter();
            DataTable table = new DataTable();
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "SELECT order_id, user.email, status, order_create, user.photo FROM `order` JOIN user ON `order`.user_id = user.id WHERE user_id>0 AND order_create >= @StartDate AND order_create < @EndDate";
                command.Parameters.Add("@StartDate", MySqlDbType.Date).Value = yesterday;
                command.Parameters.Add("@EndDate", MySqlDbType.Date).Value = today;
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

        public List<AllOrderAdminModel> getAllOrderLastMonath()
        {
            List<AllOrderAdminModel> _data = new List<AllOrderAdminModel>();
            AllOrderAdminModel _model;

            DateTime today = DateTime.Now.Date;
            DateTime lastMonthStart = today.AddMonths(-1).Date;
            DateTime thisMonthStart = new DateTime(today.Year, today.Month, 1);

            MySqlDataAdapter adapter = new MySqlDataAdapter();
            DataTable table = new DataTable();
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "SELECT order_id, user.email, status, order_create, user.photo FROM `order` JOIN user ON `order`.user_id = user.id WHERE user_id>0 AND order_create >= @LastMonthStart AND order_create < @ThisMonthStart";
                command.Parameters.Add("@LastMonthStart", MySqlDbType.Date).Value = lastMonthStart;
                command.Parameters.Add("@ThisMonthStart", MySqlDbType.Date).Value = thisMonthStart;
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

        public List<AllOrderAdminModel> getAllOrderLastYear()
        {
            List<AllOrderAdminModel> _data = new List<AllOrderAdminModel>();
            AllOrderAdminModel _model;

            DateTime today = DateTime.Now.Date;
            DateTime lastYearStart = today.AddYears(-1).Date;
            DateTime thisYearStart = new DateTime(today.Year, 1, 1);

            MySqlDataAdapter adapter = new MySqlDataAdapter();
            DataTable table = new DataTable();
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "SELECT order_id, user.email, status, order_create, user.photo FROM `order` JOIN user ON `order`.user_id = user.id WHERE user_id>0 AND order_create >= @LastYearStart AND order_create < @ThisYearStart";
                command.Parameters.Add("@LastYearStart", MySqlDbType.Date).Value = lastYearStart;
                command.Parameters.Add("@ThisYearStart", MySqlDbType.Date).Value = thisYearStart;
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

        public List<AllOrderAdminModel> getAllOrderThisDay()
        {
            List<AllOrderAdminModel> _data = new List<AllOrderAdminModel>();
            AllOrderAdminModel _model;

            DateTime today = DateTime.Now.Date;

            MySqlDataAdapter adapter = new MySqlDataAdapter();
            DataTable table = new DataTable();
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "SELECT order_id, user.email, status, order_create, user.photo FROM `order` JOIN user ON `order`.user_id = user.id WHERE user_id>0 AND order_create = @Today";
                command.Parameters.Add("@Today", MySqlDbType.Date).Value = today;
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

        public List<AllOrderAdminModel> getAllOrderThisMonath()
        {
            List<AllOrderAdminModel> _data = new List<AllOrderAdminModel>();
            AllOrderAdminModel _model;

            DateTime today = DateTime.Now.Date;
            DateTime thisMonthStart = new DateTime(today.Year, today.Month, 1);
            DateTime nextMonthStart = thisMonthStart.AddMonths(1);

            MySqlDataAdapter adapter = new MySqlDataAdapter();
            DataTable table = new DataTable();
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "SELECT order_id, user.email, status, order_create, user.photo FROM `order` JOIN user ON `order`.user_id = user.id WHERE user_id>0 AND order_create >= @ThisMonthStart AND order_create < @NextMonthStart";
                command.Parameters.Add("@ThisMonthStart", MySqlDbType.Date).Value = thisMonthStart;
                command.Parameters.Add("@NextMonthStart", MySqlDbType.Date).Value = nextMonthStart;
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

        public List<AllOrderAdminModel> getAllOrderThisYear()
        {
            List<AllOrderAdminModel> _data = new List<AllOrderAdminModel>();
            AllOrderAdminModel _model;

            DateTime today = DateTime.Now.Date;
            DateTime thisYearStart = new DateTime(today.Year, 1, 1);
            DateTime nextYearStart = new DateTime(today.Year + 1, 1, 1);

            MySqlDataAdapter adapter = new MySqlDataAdapter();
            DataTable table = new DataTable();
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "SELECT order_id, user.email, status, order_create, user.photo FROM `order` JOIN user ON `order`.user_id = user.id WHERE user_id>0 AND order_create >= @ThisYearStart AND order_create < @NextYearStart";
                command.Parameters.Add("@ThisYearStart", MySqlDbType.Date).Value = thisYearStart;
                command.Parameters.Add("@NextYearStart", MySqlDbType.Date).Value = nextYearStart;
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
                _model.ProductCost = Convert.ToDouble(row["cost"].ToString());
                _model.ProductCostSummary = (Convert.ToDouble(row["cost"].ToString()) * Convert.ToInt32(row["count"].ToString()));
                _model.ImageUrl = (byte[])row["image"];
                _modelList.Add(_model);
            }
            return _modelList;
        }

        public List<OrderDetailsProductModel> getAllProductsInOrderArchive(int orderID)
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
                command.CommandText = "SELECT products.id, products.name, products_order_removed_user.towar_count, products.cost ,products.image FROM products_order_removed_user JOIN products ON products_order_removed_user.towar_id=products.id WHERE products_order_removed_user.order_id=@orderid";
                command.Parameters.Add("@orderid", MySqlDbType.Int32).Value = orderID;
                adapter.SelectCommand = command;
                adapter.Fill(table);
            }
            foreach (DataRow row in table.Rows)
            {
                _model = new OrderDetailsProductModel();
                _model.IdProduct = Convert.ToInt32(row["id"].ToString());
                _model.NameProduct = row["name"].ToString();
                _model.CountProduct = Convert.ToInt32(row["towar_count"].ToString());
                _model.ProductCost = Convert.ToDouble(row["cost"].ToString());
                _model.ProductCostSummary = (Convert.ToDouble(row["cost"].ToString()) * Convert.ToInt32(row["towar_count"].ToString()));
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
                command.CommandText = "SELECT `order`.status, `order`.cost, `order`.client_name, `order`.client_lastname, `order`.client_phone, access_point.country, access_point.state, access_point.city, access_point.street, access_point.building_num, access_point.post_index FROM `order` JOIN access_point ON `order`.access_point_id=access_point.id WHERE `order`.order_id=@orderid AND `order`.user_id=@userid;";
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
                orderModel.Cost = Convert.ToDouble(row["cost"].ToString());
                orderModel.ClientName = row["client_name"].ToString();
                orderModel.ClientLastname = row["client_lastname"].ToString();
                orderModel.Phones = row["client_phone"].ToString();
                orderModel.ShopAddress = row["building_num"].ToString() + ", " + row["street"].ToString() + " St. "
                    + row["city"].ToString() + ", " + row["post_index"].ToString() + ", " + row["state"].ToString()+", "+row["country"].ToString();

            }
            return orderModel;

        }

        public OrderDetailsModel getOrderDetailsByUserNameAndOrderID(int orderID, string username)
        {
            OrderDetailsModel orderModel = new OrderDetailsModel();

            MySqlDataAdapter adapter = new MySqlDataAdapter();
            DataTable table = new DataTable();
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "SELECT `order_removed_user`.cost, `order_removed_user`.name, `order_removed_user`.lastname, `order_removed_user`.phone,`order_removed_user`.comment, access_point.state, access_point.city, access_point.street, access_point.building_num, access_point.post_index FROM `order_removed_user` JOIN access_point ON `order_removed_user`.ap_id=access_point.id WHERE `order_removed_user`.order_id=@orderid AND `order_removed_user`.username=@username;";
                command.Parameters.Add("@orderid", MySqlDbType.Int32).Value = orderID;
                command.Parameters.Add("@username", MySqlDbType.VarChar).Value = username;
                adapter.SelectCommand = command;
                adapter.Fill(table);
            }
            foreach (DataRow row in table.Rows)
            {

                orderModel.OrderID = orderID;
                orderModel.Status = row["comment"].ToString();
                orderModel.Cost = Convert.ToDouble(row["cost"].ToString());
                orderModel.ClientName = row["name"].ToString();
                orderModel.ClientLastname = row["lastname"].ToString();
                orderModel.Phones = row["phone"].ToString();
                orderModel.ShopAddress = row["building_num"].ToString() + " " + row["street"].ToString() + " St. "
                    + row["city"].ToString() + " " + row["post_index"].ToString() + " " + row["state"].ToString();

            }
            return orderModel;
        }

        public int getTotalOrdersArchiveClient(string username)
        {
            int totalOrdersClient = 0;
            MySqlDataAdapter adapter = new MySqlDataAdapter();
            DataTable table = new DataTable();
            using (var connection = GetConnection())
            using (var command = new MySqlCommand())
            {
                connection.Open();
                command.Connection = connection;
                command.CommandText = "SELECT COUNT(order_id) FROM `order_removed_user` WHERE username=@uname";
                command.Parameters.Add("@uname", MySqlDbType.VarString).Value = username;
                adapter.SelectCommand = command;
                adapter.Fill(table);
            }
            foreach (DataRow row in table.Rows)
            {
                totalOrdersClient = Convert.ToInt32(row[0].ToString());
            }
            return totalOrdersClient;
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
        public List<AllOrderAdminModel> getAllOrderArchiveRemovedUser()
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
                command.CommandText = "SELECT order_id, username, date_create, comment FROM `order_removed_user` WHERE comment=@comm";
                command.Parameters.Add("@comm", MySqlDbType.VarChar).Value = "Removed user";
                adapter.SelectCommand = command;
                adapter.Fill(table);
            }
            foreach (DataRow row in table.Rows)
            {
                _model = new AllOrderAdminModel();
                _model.OrderID = Convert.ToInt32(row["order_id"].ToString());
                _model.UserEmail = row["username"].ToString();
                _model.Status = row["comment"].ToString();
                _model.DateTime = Convert.ToDateTime(row["date_create"].ToString());
                _data.Add(_model);
            }
            return _data;
        }
        public List<AllOrderAdminModel> getAllOrderArchivePotentialAttack()
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
                command.CommandText = "SELECT order_id, username, date_create, comment FROM `order_removed_user` WHERE comment=@comm";
                command.Parameters.Add("@comm", MySqlDbType.VarChar).Value = "Potential attack";
                adapter.SelectCommand = command;
                adapter.Fill(table);
            }
            foreach (DataRow row in table.Rows)
            {
                _model = new AllOrderAdminModel();
                _model.OrderID = Convert.ToInt32(row["order_id"].ToString());
                _model.UserEmail = row["username"].ToString();
                _model.Status = row["comment"].ToString();
                _model.DateTime = Convert.ToDateTime(row["date_create"].ToString());
                _data.Add(_model);
            }
            return _data;
        }
    }
}

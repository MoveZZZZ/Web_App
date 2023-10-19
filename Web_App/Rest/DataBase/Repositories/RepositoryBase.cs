using MySql.Data.MySqlClient;

namespace Web_App.Rest.DataBase.Repositories
{
    public abstract class RepositoryBase
    {
        private readonly string _connectionString;
        public RepositoryBase()
        {
            _connectionString = "server = localhost; port = 3306; username = root; password = 259156; database = web_base";
        }
        protected MySqlConnection GetConnection()
        {
            return new MySqlConnection(_connectionString);
        }
    }
}

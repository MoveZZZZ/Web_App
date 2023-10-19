using MySql.Data.MySqlClient;
using Web_App.Rest.Authorization.Models;

namespace Web_App.Rest.Authorization.Repositories
{
    public interface IUserRegistrationRepository
    {
        void addUserInDB(RegisterModel registerModel);
        MySqlDataReader getByUsernameFromDB(string registerUsername);



    }
}

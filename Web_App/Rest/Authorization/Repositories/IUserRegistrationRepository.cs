using MySql.Data.MySqlClient;
using System.Data;
using Web_App.Rest.Authorization.Models;

namespace Web_App.Rest.Authorization.Repositories
{
    public interface IUserRegistrationRepository
    {
        void addUserInDB(RegisterModel registerModel);
        DataTable getByUsernameFromDB(string username);
        DataTable getByEmailFromDB(string email);



    }
}

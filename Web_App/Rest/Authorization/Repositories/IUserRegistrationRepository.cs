using MySql.Data.MySqlClient;
using System.Data;
using Web_App.Rest.Authorization.Models;

namespace Web_App.Rest.Authorization.Repositories
{
    public interface IUserRegistrationRepository
    {
        void addUserInDB(RegisterModel registerModel, byte[] img);
        DataTable getByUsernameFromDB(string username);
        DataTable getByEmailFromDB(string email);
        void addUserInTempDB(RegisterModel registerModel, string uid);
        bool checkUsernameFromTempTable (string username);
        bool checkEmailFromTempTable (string email);
        void addUserInDBAfterCheckUID(string uid, byte[] img);
        bool isUIDExist(string uid);



    }
}

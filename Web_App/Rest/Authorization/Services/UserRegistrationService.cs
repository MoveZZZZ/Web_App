using MySql.Data.MySqlClient;
using Web_App.Rest.Authorization.Models;
using Web_App.Rest.Authorization.Repositories;

namespace Web_App.Rest.Authorization.Services
{
    public class UserRegistrationService
    {
        private string _message = "";
        private IUserRegistrationRepository _userRegistrationRepository;

        public UserRegistrationService()
        {
            _userRegistrationRepository= new UserRegistrationRepository();
        }


        public bool chekUsername(RegisterModel userRegistModel)
        {
            MySqlDataReader reader = _userRegistrationRepository.getByUsernameFromDB(userRegistModel.Login);
            if(reader.HasRows)
            {
                return true;
            }
            return false;
        }








        public string checkAllData(RegisterModel userRegistModel)
        {
            if (chekUsername(userRegistModel))
                return _message = "Hujowy login";

            return _message;
        }


    }
}

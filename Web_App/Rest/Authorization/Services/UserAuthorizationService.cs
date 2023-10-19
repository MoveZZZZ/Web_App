using Web_App.Rest.Authorization.Repositories;

namespace Web_App.Rest.Authorization.Services
{
    public class UserAuthorizationService
    {
        private string _message = "";

        private IUserRegistrationRepository _userRegistrationRepository;

        public UserAuthorizationService()
        {
            _userRegistrationRepository = new UserRegistrationRepository();
        }


    }
}

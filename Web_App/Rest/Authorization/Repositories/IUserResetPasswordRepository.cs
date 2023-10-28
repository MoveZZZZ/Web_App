using Web_App.Rest.Authorization.Models;
using Web_App.Rest.User.Models;

namespace Web_App.Rest.Authorization.Repositories
{
    public interface IUserResetPasswordRepository
    {
        public void createResetLink(int id, string uid);
        public int getResetUserIDViaUID(string uid);
    }
}

using Web_App.Rest.User.Models;

namespace Web_App.Rest.Authorization.Repositories
{
    public interface IUserMFAuthRepository
    {
        public void addOtpIntoTempTable(string uid, string otp, int user_id);
        public bool isMfaRequestExists(int user_ID);
        public bool isUIDExists(string uid);
        public bool isCodeValid(string code);
        public UserModel getUserDataViaUID(string uid);
        public void clearifyingByUID(string uid);
    }
}

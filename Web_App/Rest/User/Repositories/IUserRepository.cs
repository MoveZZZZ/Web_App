using Web_App.Rest.User.Models;

namespace Web_App.Rest.User.Repositories
{
    public interface IUserRepository
    {
        public UserModel getUnamePhotoByUserID(int userID);
        public UserModel getUnameEmailPhotoByUserID(int userID);
        public UserModel getDataUser(int userID);
        public void changeAvatarByID(byte[] img, int userID);
        public void changeUserNameByID(int userID, string userName);
        public void changeEmailNameByID(int userID, string email);
        public void changePasswordByID(int userID, string password);
        public void deleteAccountByID(int userID);
        public int getIDByEmail(string email);
    }
}

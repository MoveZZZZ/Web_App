using Web_App.Rest.User.Models;

namespace Web_App.Rest.User.Repositories
{
    public interface IUserRepository
    {
        public UserModel getUnamePhotoByUserID(int userID);
        public UserModel getUnameEmailPhotoByUserID(int userID);
        public void changeAvatarByID(byte[] img, int userID);
    }
}

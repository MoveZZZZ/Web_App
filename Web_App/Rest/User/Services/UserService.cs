using K4os.Compression.LZ4.Streams.Frames;
using SixLabors.ImageSharp.Formats.Jpeg;
using Web_App.Rest.Authorization.Models;
using Web_App.Rest.Authorization.Services;
using Web_App.Rest.User.Models;
using Web_App.Rest.User.Repositories;

namespace Web_App.Rest.User.Services
{
    public class UserService
    {
        private IUserRepository _userRepository;
        private UserRegistrationService _userRegistrationService;


        public UserService()
        {
            _userRepository = new UserRepository();
            _userRegistrationService = new UserRegistrationService();
        }

        private bool verifyPasswords(string passwords, string passwordFromDB)
        {
            if (BCrypt.Net.BCrypt.Verify(passwords, passwordFromDB))
            {
                return true;
            }
           return false;
            
        }


        public UserModel getUsernamePhotoByID(int id)
        {
            UserModel userModel = new UserModel();
            userModel = _userRepository.getUnamePhotoByUserID(id);
            return userModel;
        }

        public UserModel getUnameEmailPhotoByUserID (int id) { 
            UserModel user = new UserModel();  
            user = _userRepository.getUnameEmailPhotoByUserID(id);
            return user;
        }
        private byte[] CompressImage(byte[] originalImage, int maxWidth, int maxHeight, int quality)
        {
            using (var originalImageStream = new MemoryStream(originalImage))
            using (var compressedImageStream = new MemoryStream())
            {
                using (var image = SixLabors.ImageSharp.Image.Load(originalImageStream))
                {
                    image.Mutate(x => x.Resize(new ResizeOptions
                    {
                        Size = new Size(maxWidth, maxHeight),
                        Mode = ResizeMode.Max
                    }));
                    var jpegEncoder = new JpegEncoder
                    {
                        Quality = quality
                    };
                    image.Save(compressedImageStream, jpegEncoder);
                }

                return compressedImageStream.ToArray();
            }
        }
        public void changeUserAvatar (IFormFile file, int userID)
        {
            byte[] newImage;
            try
            {
                using (var stream = new MemoryStream())
                {
                    file.CopyToAsync(stream);
                    Thread.Sleep(250);
                    byte[] imageData = stream.ToArray();

                    newImage = CompressImage(imageData, 800, 600, 100);
                }
                _userRepository.changeAvatarByID(newImage, userID);
            }
            catch (Exception ex)
            {

            }

        }


        public string changeLoginByID(ModifyUserRequestModel _modelRequest)
        {
            UserModel _userModelBase = new UserModel();
            _userModelBase = _userRepository.getDataUser(_modelRequest.UserID);

            if(_userRegistrationService.checkUsername(_modelRequest.UserName))
                return "Bad login!";

            if (!verifyPasswords(_modelRequest.Password, _userModelBase.Password))
                return "Bad password!";

            _userRepository.changeUserNameByID(_modelRequest.UserID, _modelRequest.UserName);
            return "Login successfully changed";
        }

        public string changeEmailByID(ModifyUserRequestModel _modelRequest)
        {
            UserModel _userModelBase = new UserModel();
            _userModelBase = _userRepository.getDataUser(_modelRequest.UserID);

            if (_userRegistrationService.checkEmail(_modelRequest.Email))
                return "Bad email";
            if (!verifyPasswords(_modelRequest.Password, _userModelBase.Password))
                return "Bad password!";
            _userRepository.changeEmailNameByID(_modelRequest.UserID, _modelRequest.Email);
            return "Email successfully changed";
        }

        public string changePasswordByID(ModifyUserRequestModel _modelRequest)
        {
            UserModel _userModelBase = new UserModel();
            _userModelBase = _userRepository.getDataUser(_modelRequest.UserID);

            if (!verifyPasswords(_modelRequest.Password, _userModelBase.Password))
                return "Wrong current password!";

            if (_userRegistrationService.checkSamePassword(_modelRequest.NewPassword, _modelRequest.RepeatNewPassword))
                return "Password must be same!";

            _modelRequest.NewPassword = _userRegistrationService.checkPasswordSpaces(_modelRequest.NewPassword);

            if (_userRegistrationService.checkPasswordLenAndPopular(_modelRequest.NewPassword))
                return "Bad new password! The password must be at least 12 characters long, all repeated spaces are replaced by a single space!";
            _modelRequest.NewPassword = _userRegistrationService.hashPassword(_modelRequest.NewPassword);

            _userRepository.changePasswordByID(_modelRequest.UserID, _modelRequest.NewPassword);
            return "Your password successfully changed!";

        }
        public string removeAccountByID (ModifyUserRequestModel _modelRequest)
        {
            UserModel _userModelBase = new UserModel();
            _userModelBase = _userRepository.getDataUser(_modelRequest.UserID);

            if (!verifyPasswords(_modelRequest.Password, _userModelBase.Password))
                return "Wrong current password!";
            _userRepository.deleteAccountByID(_modelRequest.UserID);
            return "Your account successfully removed!";

        }
        public int getIDByEmail (string email)
        {
            int ID = 0;
            ID = _userRepository.getIDByEmail(email);
            return ID;
        }
    }
}

using K4os.Compression.LZ4.Streams.Frames;
using SixLabors.ImageSharp.Formats.Jpeg;
using Web_App.Rest.Authorization.Models;
using Web_App.Rest.Authorization.Services;
using Web_App.Rest.User.Models;
using Web_App.Rest.User.Repositories;
using MimeDetective;
using Microsoft.AspNetCore.Http;
using System.IO;

namespace Web_App.Rest.User.Services
{
    public class UserService
    {
        private IUserRepository _userRepository;
        private UserRegistrationService _userRegistrationService;
        private MailSendingService _mailSendingService;


        public UserService(IConfiguration configuration)
        {
            _mailSendingService = new MailSendingService(configuration);
            _userRepository = new UserRepository();
            _userRegistrationService = new UserRegistrationService(configuration);
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

        public UserModel getUnameEmailPhotoByUserID(int id)
        {
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
        public string changeUserAvatar(IFormFile file, int userID)
        {
            if (file != null && IsAllowedFileType(file))
            {
                byte[] newImage;
                using (var stream = new MemoryStream())
                {
                    file.CopyToAsync(stream);
                    Thread.Sleep(250);
                    byte[] imageData = stream.ToArray();

                    newImage = CompressImage(imageData, 800, 600, 100);
                }
                _userRepository.changeAvatarByID(newImage, userID);
                return "Ok";
            }
            else
                return "Bad";

        }
        public string changeLoginByID(ModifyUserRequestModel _modelRequest)
        {
            UserModel _userModelBase = new UserModel();
            _userModelBase = _userRepository.getDataUser(_modelRequest.UserID);

            if (_userRegistrationService.checkUsername(_modelRequest.UserName))
                return "Bad login!";

            if (!verifyPasswords(_modelRequest.Password, _userModelBase.Password))
                return "Bad password!";

            _userRepository.changeUserNameByID(_modelRequest.UserID, _modelRequest.UserName);
            _mailSendingService.SendMailByUserAuthDataChange(_userModelBase.Email, "USERNAME");
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

            _mailSendingService.SendMailByUserAuthDataChange(_userModelBase.Email, "EMAIL");
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
            _mailSendingService.SendMailByUserAuthDataChange(_userModelBase.Email, "PASSWORD");
            return "Your password successfully changed!";

        }
        public string removeAccountByID(ModifyUserRequestModel _modelRequest)
        {
            UserModel _userModelBase = new UserModel();
            _userModelBase = _userRepository.getDataUser(_modelRequest.UserID);

            if (!verifyPasswords(_modelRequest.Password, _userModelBase.Password))
                return "Wrong current password!";
            _userRepository.deleteAccountByID(_modelRequest.UserID);
            _mailSendingService.SendMailByAccountRemove(_userModelBase.Email);
            return "Your account successfully removed!";

        }
        public int getIDByEmail(string email)
        {
            int ID = 0;
            ID = _userRepository.getIDByEmail(email);
            return ID;
        }
        public bool IsAllowedFileType(IFormFile file)
        {
            if (isPNG(file) || isJPGorJPEG(file))
                return true;
            return false;

        }
        private static bool isPNG(IFormFile file)
        {
            byte[] pngMagicNumber = new byte[] { 137, 80, 78, 71, 13, 10, 26, 10 };
            using (var stream = file.OpenReadStream())
            {
                byte[] buffer = new byte[8];
                stream.Read(buffer, 0, 8);
                if (ByteArrayCompare(buffer, pngMagicNumber))
                {
                    return true;
                }
            }

            return false;
        }
        private static bool isJPGorJPEG(IFormFile file)
        {
            byte[] jpegMagicNumber = new byte[] { 255, 216, 255 };
            byte[] jpgMagicNumber = new byte[] { 255, 216, 255 };
            using (var stream = file.OpenReadStream())
            {
                byte[] buffer = new byte[3];
                stream.Read(buffer, 0, 3);
                if (ByteArrayCompare(buffer, jpegMagicNumber) || ByteArrayCompare(buffer, jpgMagicNumber))
                {
                    return true;
                }
            }
            return false;
        }

        private static bool ByteArrayCompare(byte[] a1, byte[] a2)
        {
            if (a1.Length != a2.Length)
                return false;

            for (int i = 0; i < a1.Length; i++)
            {
                if (a1[i] != a2[i])
                    return false;
            }

            return true;
        }
    }
}

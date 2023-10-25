using K4os.Compression.LZ4.Streams.Frames;
using SixLabors.ImageSharp.Formats.Jpeg;
using Web_App.Rest.User.Models;
using Web_App.Rest.User.Repositories;

namespace Web_App.Rest.User.Services
{
    public class UserService
    {
        private IUserRepository _userRepository;


        public UserService()
        {
            _userRepository = new UserRepository();
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
        public byte[] CompressImage(byte[] originalImage, int maxWidth, int maxHeight, int quality)
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
    }
}

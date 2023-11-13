using Org.BouncyCastle.Asn1.Pkcs;
using System.Data;
using Web_App.Rest.Authorization.Models;
using Web_App.Rest.Authorization.Repositories;
using Web_App.Rest.Authorization.Services;
using Web_App.Rest.JWT.Model;
using Web_App.Rest.JWT.Services;
using Web_App.Rest.User.Models;
using System;
using System.Security.Cryptography;
using System.Text;
using System.Reflection.Metadata.Ecma335;

namespace Web_App.Rest.Authorization.Services
{
    public class UserMFAuthService
    {
        private IUserMFAuthRepository _userMFARepo;
        private IUserAuthorizationRepository _userAuthRepo;
        private MailSendingService _mailSendingService;
        private ITokenService _tokenService;

        public UserMFAuthService(ITokenService tokenService, IConfiguration conf)
        {
            _tokenService = tokenService;
            _mailSendingService = new MailSendingService(conf);
            _userMFARepo = new UserMFAuthRepository();
            _userAuthRepo = new UserAuthorizationRepository();
        }

        public AuthorizationResponseModel codeSubmit(string code, string uid)
        {
            AuthorizationResponseModel response = new AuthorizationResponseModel();
            response.UserID = 0;
            if (!_userMFARepo.isUIDExists(uid) || !_userMFARepo.isCodeValid(code))
            {
                return response;
            }
            UserModel model = getUserDataViaUIDwithClearifying(uid);
            response.UserID = model.Id;
            response.Role = model.Role;
            Token token = _tokenService.CreateToken(model);
            response.UserToken = token.AccessToken;
            response.UserRefreshToken = token.RefreshToken;
            return response;
        }

        private UserModel getUserDataViaUIDwithClearifying(string uid)
        {
            UserModel userData = new UserModel();
            userData = _userMFARepo.getUserDataViaUID(uid);
            _userMFARepo.clearifyingByUID(uid);
            return userData;
        }

        public string checkExistMFAuthUID(string uid)
        {
            if (_userMFARepo.isUIDExists(uid))
                return "Valid!";
            return "No valid!";
        }

        public string generateAdminUID(int user_ID)
        {
            string uid = "";
            if (_userMFARepo.isMfaRequestExists(user_ID))
            {
                return uid;
            }
            UserModel model = _userAuthRepo.getUserDataFromDBviaID(user_ID);
            uid = generateUID(model);
            string otp = generateOTP();
            _userMFARepo.addOtpIntoTempTable(uid, otp, user_ID);
            _mailSendingService.SendMailWithOTP(model.Email, uid, otp);
            return uid;
        }

        private string generateUID(UserModel model)
        {
            Random rand = new Random();
            int payload = rand.Next(1000000, 9999999);
            string mergedData = model.Password + Convert.ToString(payload) + model.Email;
            using (SHA512 sha512 = SHA512.Create())
            {
                byte[] inputBytes = Encoding.UTF8.GetBytes(mergedData);
                byte[] hashBytes = sha512.ComputeHash(inputBytes);
                // Convert the hash to a hexadecimal string
                StringBuilder hashBuilder = new StringBuilder(hashBytes.Length * 2);
                foreach (byte b in hashBytes)
                {
                    hashBuilder.AppendFormat("{0:x2}", b);
                }
                return hashBuilder.ToString();
            }
        }
        private string generateOTP()
        {
            Random rand = new Random();
            var allowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
            var output = new char[8];
            for (int i = 0; i < output.Length; i++)
            {
                output[i] = allowedChars[rand.Next(allowedChars.Length)];
            }
            return new String(output);
        }

    }
}

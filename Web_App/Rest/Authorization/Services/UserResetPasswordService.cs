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

namespace Web_App.Rest.Authorization.Services
{
    public class UserResetPasswordService
    {
        private IUserResetPasswordRepository _resetPasswordRepository;
        private IUserAuthorizationRepository _userAuth;
        private MailSendingService _mailSendingService;
        private UserRegistrationService _userRegistrationService;

        public UserResetPasswordService(IConfiguration conf)
        {
            _mailSendingService = new MailSendingService(conf);
            _resetPasswordRepository = new UserResetPasswordRepository();
            _userAuth = new UserAuthorizationRepository();
            _userRegistrationService = new UserRegistrationService(conf);
        }

        public string checkExistUID(string uid)
        {
            if (_resetPasswordRepository.isUIDExist(uid))
                return "Valid!";
            return "No valid!";
        }
        public bool processingUserResetPasswordRequest(string email)
        {
            ResetPasswordModel user = createResetLink(email);
            if (user.UID == null)
            {
                return false;
            }
            _mailSendingService.SendMailWithRecoveryLink(user.Email, user.UID);
            return true;
        }

        private ResetPasswordModel createResetLink(string email)
        {
            ResetPasswordModel reset = new ResetPasswordModel();
            UserModel user = _userAuth.getUserDataFromDBviaEmail(email);
            if (_resetPasswordRepository.isRequestForIdExists(user.Id))
            {
                return reset;
            }
            Random rand = new Random();
            int payload = rand.Next(1000000, 9999999);
            string mergedData = user.Password + Convert.ToString(payload) + user.Email;
            string uid = CalculateSHA512Hash(mergedData);
            _resetPasswordRepository.createResetLink(user.Id, uid);
            reset.UID = uid;
            reset.Email = email;
            return reset;
        }



        static string CalculateSHA512Hash(string input)
        {
            using (SHA512 sha512 = SHA512.Create())
            {
                byte[] inputBytes = Encoding.UTF8.GetBytes(input);
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
        public string ChangePaswwordUser(string password, string confirm, string uid)
        {
            if (_userRegistrationService.checkSamePassword(password, confirm))
                return "Password must be same!";

            password = _userRegistrationService.checkPasswordSpaces(password);

            if (_userRegistrationService.checkPasswordLenAndPopular(password))
                return "Bad new password! The password must be at least 12 characters long, all repeated spaces are replaced by a single space!";
            password = _userRegistrationService.hashPassword(password);


            _resetPasswordRepository.updatePasswordUser(uid, password);
            return "Your password successfully changed!";
        }
    }
}

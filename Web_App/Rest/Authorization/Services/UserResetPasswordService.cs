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
        private IUserResetPasswordRepository _resetrepo;
        private IUserAuthorizationRepository _userAuth;
        private MailSendingService _mailSendingService;

        public UserResetPasswordService(IConfiguration conf)
        {
            _mailSendingService = new MailSendingService(conf);
            _resetrepo = new UserResetPasswordRepository();
            _userAuth = new UserAuthorizationRepository();
        }

        public bool passwordRecoveryUIDvalidation(string uid)
        {
            int userID = _resetrepo.getResetUserIDViaUID(uid);
            if (userID != 0)
            {
                return true;
            }
            return false;
        }
        public void processingUserResetPasswordRequest(string email)
        {
            ResetPasswordModel user = createResetLink(email);
            _mailSendingService.SendMailWithRecoveryLink(user.Email, user.UID);
        }

        private ResetPasswordModel createResetLink(string email)
        {
            ResetPasswordModel reset = new ResetPasswordModel();
            UserModel user = _userAuth.getUserDataFromDBviaEmail(email);
            Random rand = new Random();
            int payload = rand.Next(1000000, 9999999);
            string mergedData = user.Password + Convert.ToString(payload) + user.Email;
            string uid = CalculateSHA512Hash(mergedData);
            _resetrepo.createResetLink(user.Id, uid);
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
    }
}

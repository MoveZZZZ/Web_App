using MySql.Data.MySqlClient;
using Org.BouncyCastle.Crypto.Generators;
using Web_App.Rest.Authorization.Models;
using Web_App.Rest.Authorization.Repositories;
using System.Net;
using System.Text.RegularExpressions;
using Microsoft.Extensions.Logging.Abstractions;
using System.Data;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using SixLabors.ImageSharp.Formats;
using System.Text;
using System.Security.Cryptography;

namespace Web_App.Rest.Authorization.Services
{
    public class UserRegistrationService
    {
        private string _message = "";
        private IUserRegistrationRepository _userRegistrationRepository;
        private MailSendingService _mailSendingService;

        public UserRegistrationService(IConfiguration _configuration)
        {
            _userRegistrationRepository = new UserRegistrationRepository();
            _mailSendingService = new MailSendingService(_configuration);
        }



        //login
        private bool chekUsernameFromDB(string login)
        {
            DataTable reader = _userRegistrationRepository.getByUsernameFromDB(login);
            if (reader.Rows.Count > 0)
            {
                return true;
            }
            return false;
        }
        private bool checkDefaultAccountName(string login)
        {
            string[] lines = File.ReadAllLines("Rest/Authorization/DefaultAccountNames.txt");
            if (lines.Contains(login.ToLower()))
            {
                return true;
            }
            return false;
        }


        //password
        private bool checkPasswordAndRepeatPassword(string password, string repeatPassword)
        {
            if (password != repeatPassword)
                return true;
            return false;
        }
        private bool checkPasswordLenght(string password)
        {
            if (password.Length < 12
                || password.Length > 86)
                return true;
            return false;
        }
        private bool checkPasswordMostPopular(string password)
        {
            string[] lines = File.ReadAllLines("Rest/Authorization/10000Passwords.txt");
            if (lines.Contains(password))
            {
                return true;
            }
            return false;
        }
        public string checkPasswordSpaces(string password)
        {
            char lastSymbol = '1';
            string updatedPassword = "";
            foreach (char c in password)
            {
                if (char.IsWhiteSpace(c) && char.IsWhiteSpace(lastSymbol))
                {
                    continue;
                }
                updatedPassword += c;
                lastSymbol = c;
            }
            return updatedPassword;
        }


        //hash
        public string hashPassword(string password)
        {
            string hashedPass = BCrypt.Net.BCrypt.HashPassword(password);
            return hashedPass;
        }



        //email
        private bool checkEmailSyntax(string email)
        {
            string pattern = @"^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$";
            Regex r = new Regex(pattern, RegexOptions.IgnoreCase);
            if (email == null || !r.Match(email).Success)
                return true;
            return false;
        }
        private bool checkEmailFromDB(string email)
        {
            DataTable reader = _userRegistrationRepository.getByEmailFromDB(email);
            if (reader.Rows.Count > 0)
            {
                return true;
            }
            return false;
        }

        private byte[] createImageByte ()
        {
            using (Bitmap image = new Bitmap("Rest/User/Assets/userPhoto.png"))
            {
                using (MemoryStream stream = new MemoryStream())
                {
                    image.Save(stream, ImageFormat.Png);

                    byte[] byteArray = stream.ToArray();

                    return byteArray;
                }
            }
        }

        public bool checkUsername (string username)
        {
            if (chekUsernameFromDB(username)
                || username.Length > 255
                || checkDefaultAccountName(username) || _userRegistrationRepository.checkUsernameFromTempTable(username))
                return true;
            return false;
        }
        public bool checkEmail (string email)
        {
            if (email.Length > 128 ||checkEmailSyntax(email)
               || checkEmailFromDB(email) || _userRegistrationRepository.checkEmailFromTempTable(email))
                return true;
            return false;
        }
        public bool checkSamePassword(string password, string repeatpassword)
        {
            if (checkPasswordAndRepeatPassword(password, repeatpassword))
                return true;
            return false;
        }
        public bool checkPasswordLenAndPopular (string password)
        {
            if (checkPasswordLenght(password) || checkPasswordMostPopular(password))
                return true;
            return false;
        }





        public string checkAllData(RegisterModel userRegistModel)
        {
            //Username
            if (checkUsername(userRegistModel.Login))
                return _message = "wrong username!";

            //email
            if (checkEmail(userRegistModel.Email))
                return _message = "wrong email";

            //Password
          if(checkSamePassword(userRegistModel.Password, userRegistModel.PasswordConfirm))
                return _message = "passwords are not the same";

            userRegistModel.Password=checkPasswordSpaces(userRegistModel.Password);

            if(checkPasswordLenAndPopular(userRegistModel.Password))
                return _message = "wrong password";

            userRegistModel.Password=hashPassword(userRegistModel.Password);

            return _message;
        }

        public string addUserInTempDB (RegisterModel userRegistModel)
        {
            string message = checkAllData(userRegistModel);
            string uid = gennerateUID(userRegistModel);
            if(message =="") {
                _userRegistrationRepository.addUserInTempDB(userRegistModel, uid);
                _mailSendingService.SendMailWithEmailVerify(userRegistModel.Email, uid);
                return message;
            }
            return message;
        }


        private string gennerateUID (RegisterModel model)
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


        public string addUserInDBAfterCheck (string uid)
        {
            if(_userRegistrationRepository.isUIDExist(uid))
            {
                _userRegistrationRepository.addUserInDBAfterCheckUID(uid, createImageByte());
                return _message;
            }
            else { return "Bad token"; }
        }

    }
}

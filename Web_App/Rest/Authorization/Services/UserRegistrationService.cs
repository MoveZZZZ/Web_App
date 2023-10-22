using MySql.Data.MySqlClient;
using Org.BouncyCastle.Crypto.Generators;
using Web_App.Rest.Authorization.Models;
using Web_App.Rest.Authorization.Repositories;
using System.Net;
using System.Text.RegularExpressions;
using Microsoft.Extensions.Logging.Abstractions;
using System.Data;

namespace Web_App.Rest.Authorization.Services
{
    public class UserRegistrationService
    {
        private string _message = "";
        private IUserRegistrationRepository _userRegistrationRepository;

        public UserRegistrationService()
        {
            _userRegistrationRepository= new UserRegistrationRepository();
        }



        //login
        public bool chekUsernameFromDB(RegisterModel userRegistModel)
        {
            DataTable reader = _userRegistrationRepository.getByUsernameFromDB(userRegistModel.Login);
            if(reader.Rows.Count>0)
            {
                return true;
            }
            return false;
        }
        public bool checkDefaultAccountName(RegisterModel userRegistModel)
        {
            string[] lines = File.ReadAllLines("Rest/Authorization/DefaultAccountNames.txt");
            if(lines.Contains(userRegistModel.Login.ToLower()))
            {
                return true;
            }
            return false;
        }


        //password
        public bool checkPasswordAndRepeatPassword(RegisterModel userRegistModel) 
        {
            if(userRegistModel.Password != userRegistModel.PasswordConfirm)
                return true;
            return false;
        }
        public bool checkPasswordLenght(RegisterModel userRegistModel)
        {
            if (userRegistModel.Password.Length < 12
                || userRegistModel.Password.Length > 86)
                return true;
            return false;   
        }
        public bool checkPasswordMostPopular(RegisterModel userRegistModel)
        {
            string[] lines = File.ReadAllLines("Rest/Authorization/10000Passwords.txt");
            if(lines.Contains(userRegistModel.Password))
            {
                return true;
            }
            return false;
        }
        public void checkPasswordSpaces(RegisterModel userRegistModel)
        {
            char lastSymbol='1';
            string updatedPassword = "";
            foreach (char c in userRegistModel.Password)
            {
                if (char.IsWhiteSpace(c) && char.IsWhiteSpace(lastSymbol))
                {
                    continue;
                }
                updatedPassword += c;
                lastSymbol = c;
            }
            userRegistModel.Password = updatedPassword;
        }


        //hash
        public void hashPassword(RegisterModel userRegistModel)
        {
            string hashedPass = BCrypt.Net.BCrypt.HashPassword(userRegistModel.Password);
            userRegistModel.Password=hashedPass;
        }



        //email
        public bool checkEmailSyntax(RegisterModel userRegistModel)
        {
            string pattern = @"^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$";
            Regex r = new Regex(pattern, RegexOptions.IgnoreCase);
            if (userRegistModel.Email == null || !r.Match(userRegistModel.Email).Success)
                return true;
            return false;
        }
        public bool checkEmailFromDB(RegisterModel registerModel)
        {
            DataTable reader = _userRegistrationRepository.getByEmailFromDB(registerModel.Email);
            if (reader.Rows.Count>0)
            {
                return true;
            }
            return false;
        }










        public string checkAllData(RegisterModel userRegistModel)
        {
            //Username
            if (chekUsernameFromDB(userRegistModel) 
                || userRegistModel.Login.Length>255
                || checkDefaultAccountName(userRegistModel))
                return _message = "bad login";

            //email
            if (checkEmailSyntax(userRegistModel)
                || checkEmailFromDB(userRegistModel))
                return _message = "wrong email";

            //Password
            if (checkPasswordAndRepeatPassword(userRegistModel))
                return _message = "passwords are not the same";
            checkPasswordSpaces(userRegistModel);
            if (checkPasswordLenght(userRegistModel) || checkPasswordMostPopular(userRegistModel))
                return _message = "wrong password";
            hashPassword(userRegistModel);





            _userRegistrationRepository.addUserInDB(userRegistModel);
            return _message;
        }




    }
}

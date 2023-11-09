﻿using System.Data;
using Web_App.Rest.Authorization.Models;
using Web_App.Rest.User.Models;

namespace Web_App.Rest.Authorization.Repositories
{
    public interface IUserAuthorizationRepository
    {
        UserModel getUserDataFromDB(AuthorizationModel authModel);
        UserModel getUserDataFromDBviaID(int ID);
        public UserModel getUserDataFromDBviaEmail(string email);
        public bool processAntiAutomationCheckDB(int ID);
        public void IncrementLoginFailureByID(int authorizationModel);
    }
}

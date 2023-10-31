using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System;
using Microsoft.Extensions.Configuration;
using System.Security.Cryptography;
using System.Security.Claims;
using Web_App.Rest.User.Models;
using Web_App.Rest.JWT.Model;
using Web_App.Rest.Authorization.Models;
using Web_App.Rest.Authorization.Repositories;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.AspNetCore.DataProtection.KeyManagement;
using System.Security.Principal;
using System.Collections.Specialized;

namespace Web_App.Rest.JWT.Services
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _configuration;
        private IUserAuthorizationRepository _userAuthorizationRepository;
        public TokenService(IConfiguration configuration)
        {
            _configuration = configuration;
            _userAuthorizationRepository = new UserAuthorizationRepository();
        }

        public Token CreateToken(UserModel user)
        {
            Token tokenInstance = new Token();

            SymmetricSecurityKey securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Token:SecurityKey"]));

            SigningCredentials signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
           {
                new Claim("sub", user.Login),
                new Claim("userID", Convert.ToString(user.Id)),
                //new Claim("mail", user.Email),
                new Claim("role", user.Role)
            };


            DateTime Expiration = DateTime.Now.AddSeconds(30);
            JwtSecurityToken securityToken = new JwtSecurityToken(
                issuer: _configuration["Token:Issuer"],
                audience: _configuration["Token:Audience"],
                claims: claims,
                expires: Expiration,
                notBefore: DateTime.Now,
                signingCredentials: signingCredentials
                );

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();

            tokenInstance.AccessToken = tokenHandler.WriteToken(securityToken);

            tokenInstance.RefreshToken = CreateRefreshToken(user);
            return tokenInstance;

        }
        public string CreateRefreshToken(UserModel user)
        {
            SymmetricSecurityKey securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Token:SecurityKey"]));
            //SymmetricSecurityKey securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(user.Password));

            SigningCredentials signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
           {
                new Claim("sub", user.Login),
                new Claim("userID", Convert.ToString(user.Id)),
                new Claim("role", user.Role)
            };


            DateTime Expiration = DateTime.Now.AddMinutes(2880);
            JwtSecurityToken securityToken = new JwtSecurityToken(
                issuer: _configuration["Token:Issuer"],
                audience: _configuration["Token:Audience"],
                claims: claims,
                expires: Expiration,
                notBefore: DateTime.Now,
                signingCredentials: signingCredentials
                );

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            return tokenHandler.WriteToken(securityToken);
        }

        public RefreshTokenModel RenewTokensProcessingService(string bearerToken)
        {
            var output = new RefreshTokenModel();
            output.UserID = 0;
            var user = TokenVerifyAndExtractInfoFromDatabase(bearerToken);
            if (user.Login != null)
            {
                output.UserID = user.Id;
                Token token = CreateToken(user);
                output.UserToken = token.AccessToken;
                output.UserRefreshToken = token.RefreshToken;
                output.UserRole = user.Role;
            }
            return output;
        }
        public bool IDQueryTokenVerificator(int userID, string bearerToken)
        {
            var user = TokenVerifyAndExtractInfoFromDatabase(bearerToken);
            if (user.Login != null)
            {
                if (user.Id == userID) return true;
            }
            return false;
        }
        private UserModel TokenVerifyAndExtractInfoFromDatabase(string bearerToken)
        {
            var response = new UserModel();
            var tokenHandler = new JwtSecurityTokenHandler();
            if (!ValidateToken(bearerToken))
            {
                return response;
            }
            var securityToken = (JwtSecurityToken)tokenHandler.ReadToken(bearerToken);
            var IDfromToken = Convert.ToInt32(securityToken.Claims.FirstOrDefault((c => c.Type == "userID"))?.Value);
            response = _userAuthorizationRepository.getUserDataFromDBviaID(IDfromToken);
            return response;
        }
        private bool ValidateToken(string authToken)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var validationParameters = GetValidationParameters();

            SecurityToken validatedToken;
            IPrincipal principal = tokenHandler.ValidateToken(authToken, validationParameters, out validatedToken);
            return true;
        }
        private TokenValidationParameters GetValidationParameters()
        {
            return new TokenValidationParameters()
            {
                ValidateLifetime = true, // Because there is no expiration in the generated token
                ValidateAudience = true, // Because there is no audiance in the generated token
                ValidateIssuer = true,   // Because there is no issuer in the generated token
                ValidIssuer = "259156@student.pwr.edu.pl",
                ValidAudience = "www.MOVEZZZZ.com",
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Token:SecurityKey"])) // The same key as the one that generate the token
            };
        }
    }
}

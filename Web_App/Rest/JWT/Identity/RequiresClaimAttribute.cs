using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Security.Claims;
using Web_App.Rest.User.Models;
using Web_App.Rest.JWT.Model;
using System.IdentityModel.Tokens.Jwt;

namespace Web_App.Rest.JWT.Identity
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class RequiresClaimAttribute : Attribute, IAuthorizationFilter
    {
        private readonly string _claimName;
        private readonly string _claimValue;

        public RequiresClaimAttribute(string claimName, string claimValue)
        {
            _claimName = claimName;
            _claimValue = claimValue;
        }
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            if (!roleValidator(context, _claimValue))
            {
                context.Result = new ForbidResult();
            }
        }
        private bool roleValidator(AuthorizationFilterContext context, string role)
        {
            string bearerToken = context.HttpContext.Request.Cookies["AccessToken"];
            var tokenHandler = new JwtSecurityTokenHandler();
            var securityToken = (JwtSecurityToken)tokenHandler.ReadToken(bearerToken);
            var claimValue = securityToken.Claims.FirstOrDefault((c => c.Type == "role"))?.Value;
            if (claimValue != null)
            {
                if (claimValue == role)
                {
                    return true;
                }
            }
            return false;
        }
    }
}

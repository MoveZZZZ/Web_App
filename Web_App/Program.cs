using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using MySql.Data.MySqlClient;
using System.Text;
using Web_App.Rest.Authorization.Services;
using Web_App.Rest.JWT.Services;
using Microsoft.Extensions.Configuration;
using Web_App.Rest.JWT.Model;
using Web_App.Rest.JWT.Services;
using Web_App.Rest.Payments.Service;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();


builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("https://localhost:44456")
            .WithMethods("GET", "POST", "DELETE")
            .WithHeaders("Content-Type")
            .AllowCredentials();
    });
});
builder.Services.AddScoped<ITokenService, TokenService>();

builder.Services.Configure<CookiePolicyOptions>(options =>
{
    // This lambda determines whether user consent for non-essential cookies is needed for a given request.
    options.CheckConsentNeeded = context => false;
    options.MinimumSameSitePolicy = SameSiteMode.None;
});

builder.Services.AddTransient<MySqlConnection>(_ =>
    new MySqlConnection(builder.Configuration.GetConnectionString("Default")));


builder.Services.AddTransient<IBraintreeService, BraintreeService>();
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultSignInScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false, // Set to true if needed
        ValidateAudience = false, // Set to true if needed
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        //NOT FOR RELEASE VERSION, RENEW TOKEN AFTER FIX THAT
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("MIIJKAIBAAKCAgEAr4XOvVKNneUye05zajyxBLIZXqYEg2ojbi2T+kPYCZ9oNdqqBkOnRAsdVnNYk3co8wjam80rOtZqpoamSF05cEpcvwDIrlHzf6gsMDzjr8M7/EE4EgrLpu8754+1SgmwzsOeF3ifv+agNpTsCymFlJ9PAgrgMEC9hTam0a6K7s+VTCWIcC176gbhJLZnGv74P5OcYYkjtS+/mhcYQT8f12S8gA/vkt8nFkPEQnWTKbVQgVp9iFFgVIgZ91cePBVsdAgbwbXt9su8xyNKIzMl+Op+KzZAUqMAE5UEEGdTGs6a8nIuWunuJ8vQXWMom41Vr4/Pk8E6MfD6h8/iaEZh0A1iJpjGf4KUf7ZFItzxMkaodd91K4yiUpBSamT0footwGam/Suuvf76Q8qO01Zo8gm22p1Zd/HDQNU6EmoHT4g9ERs/J7VeEm4tQyO/pMrg4eV6YXSj1vO8YCXFgcqmC1O4521MBsBvnzDjom15OqKQCHl52n93oXRBRQQ0CaaZGFSh+fSXdz3W3wA5OvpcYTRLQdkucOBL7i2m7XbEcYgP9XDENxoMZGAVbs9u6qTFwGtDh6dfuXKUe5XgMgoqRtfFDC639wQglcCGk8Fpu4w7Qp6OTlc4uaxCzF0VFqua8v72fJgtAJw/l2ghmiuQzMiWjh7kYYWSZUUgVgKum8MCAwEAAQKCAgBuHtgnRYzd/Dcgz4Zvp6Yz2P07uZLpVATokiXeBQScfOtnpkm35mghs4tzeqie1ErXt71XtHAj2PROh/n5OqvXvH/VwcsmOvo3JC6dEQaUdjvDNrPT9fvxPvTpgeruiYfpISeleCNZxXrM47/3/NP2+8AY+vPOsj91PWWJ9iTqUUhM3ttr7c1pdWl5nAqyEDd1w8mAFAdYHJ3sMgMgpFb4zxXIjrbzAZhHSrruK0/qAfyBO2G4zb1PK5iG6pxoe9RwM8oeTWL/zLEiiwxvax6uvYfs2nuenO9mWb6UAA9OqULjSym0FkI5q5CNlrGabiDNJb"))
    };
    options.SaveToken = true;
    options.Events = new JwtBearerEvents();
    options.Events.OnMessageReceived = context => {
        if (context.Request.Cookies.ContainsKey("AccessToken"))
        {
            context.Token = context.Request.Cookies["AccessToken"];
            return Task.CompletedTask;
        }
        return Task.CompletedTask;

    };
})
.AddCookie(options =>
 {
     options.Cookie.SameSite = SameSiteMode.Strict;
     options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
     options.Cookie.IsEssential = true;
 });

var app = builder.Build();
if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors();
app.UseCookiePolicy();
app.UseAuthentication();
app.UseAuthorization();
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");


app.MapFallbackToFile("index.html"); ;

app.Run();

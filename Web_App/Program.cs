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
    options.AddPolicy("AllowSpecificOrigins", builder =>
    {
        builder.WithOrigins("https://localhost:44456")
            .WithMethods("GET", "POST", "DELETE", "PATCH", "PUT")
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

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



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
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(builder.Configuration["Token:SecurityKey"]))
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
app.UseSwagger();
app.UseSwaggerUI();
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

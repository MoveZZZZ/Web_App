using System.Net;
using System.Net.Mail;
using static System.Net.WebRequestMethods;

namespace Web_App.Rest.Authorization.Services
{
    public class MailSendingService
    {
        private readonly IConfiguration _configuration;
        private readonly string IP = "https://localhost:44456";

        public MailSendingService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void SendMailWithEmailVerify(string email, string uid)
        {
            MailMessage message = new MailMessage();
            string mailOrigin = _configuration["MailService:Origin"];
            string mailAppKey = _configuration["MailService:ApplicationKey"];
            message.From = new MailAddress(mailOrigin);
            message.Subject = "Verify Email";
            message.To.Add(new MailAddress(email));
            message.Body = ("<html><body><h1>Your email verification link is:</h1>" +
                "<a href= \""+IP+"/mailverification/" + uid + "\">CLICK ME!</a></body></html>");
            message.IsBodyHtml = true;
            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential(mailOrigin, mailAppKey),
                EnableSsl = true,
            };
            smtpClient.Send(message);
        }
        public void SendMailWithEmailVerifyAfterChange(string email, string uid)
        {
            MailMessage message = new MailMessage();
            string mailOrigin = _configuration["MailService:Origin"];
            string mailAppKey = _configuration["MailService:ApplicationKey"];
            message.From = new MailAddress(mailOrigin);
            message.Subject = "Verify Email";
            message.To.Add(new MailAddress(email));
            message.Body = ("<html><body><h1>Your email verification link is:</h1>" +
                "<a href= \""+IP+"/verifychangedmail/" + uid + "\">CLICK ME!</a></body></html>");
            message.IsBodyHtml = true;
            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential(mailOrigin, mailAppKey),
                EnableSsl = true,
            };
            smtpClient.Send(message);
        }
        public void SendMailWithRecoveryLink(string email, string uid)
        {
            MailMessage message = new MailMessage();
            string mailOrigin = _configuration["MailService:Origin"];
            string mailAppKey = _configuration["MailService:ApplicationKey"];
            message.From = new MailAddress(mailOrigin);
            message.Subject = "Password Recovery Link";
            message.To.Add(new MailAddress(email));
            message.Body = ("<html><body><h1>Your password recovery link is:</h1> " +
                "<a href= \""+IP+"/recoverypage/" + uid + "\">CLICK ME!</a></body></html>");
            message.IsBodyHtml = true;
            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential(mailOrigin, mailAppKey),
                EnableSsl = true,
            };
            smtpClient.Send(message);
        }
        public void SendMailByUserAuthDataChange(string email, string subject)
        {
            MailMessage message = new MailMessage();
            string mailOrigin = _configuration["MailService:Origin"];
            string mailAppKey = _configuration["MailService:ApplicationKey"];
            message.From = new MailAddress(mailOrigin);
            message.Subject = "Your personal data has been changed";
            message.To.Add(new MailAddress(email));
            message.Body = ("<html><body>Your personal data ("+ subject + ") has been changed, if that was not you, please contact with support</body></html>");
            message.IsBodyHtml = true;
            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential(mailOrigin, mailAppKey),
                EnableSsl = true,
            };
            smtpClient.Send(message);
        }
        public void SendMailByAccountRemove(string email)
        {
            MailMessage message = new MailMessage();
            string mailOrigin = _configuration["MailService:Origin"];
            string mailAppKey = _configuration["MailService:ApplicationKey"];
            message.From = new MailAddress(mailOrigin);
            message.Subject = "Your account has been deleted";
            message.To.Add(new MailAddress(email));
            message.Body = ("<html><body>Your account has been successfully deleted, we hope to see you again!</body></html>");
            message.IsBodyHtml = true;
            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential(mailOrigin, mailAppKey),
                EnableSsl = true,
            };
            smtpClient.Send(message);
        }
        public void SendMailWithOTP(string email, string uid, string otp)
        {
            MailMessage message = new MailMessage();
            string mailOrigin = _configuration["MailService:Origin"];
            string mailAppKey = _configuration["MailService:ApplicationKey"];
            message.From = new MailAddress(mailOrigin);
            message.Subject = "2-Step authentication code";
            message.To.Add(new MailAddress(email));
            message.Body = ("<html><body><h1> " + otp + " </h1>Is your authentication code for page:" +
                "<a href= \"https://localhost:44456/oauth/" + uid + "\">Authentication page</a></body></html>");
            message.IsBodyHtml = true;
            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential(mailOrigin, mailAppKey),
                EnableSsl = true,
            };
            smtpClient.Send(message);
        }
        public void sendAutomationDetectedNotification(string email)
        {
            MailMessage message = new MailMessage();
            string mailOrigin = _configuration["MailService:Origin"];
            string mailAppKey = _configuration["MailService:ApplicationKey"];
            message.From = new MailAddress(mailOrigin);
            message.Subject = "Suspicious activity has been detected on the account";
            message.To.Add(new MailAddress(email));
            message.Body = ("<html><body>Due to the fact that increased (suspicious) activity was noticed over a long period of time, the account has been logged out!</body></html>");
            message.IsBodyHtml = true;
            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential(mailOrigin, mailAppKey),
                EnableSsl = true,
            };
            smtpClient.Send(message);
        }
    }
}

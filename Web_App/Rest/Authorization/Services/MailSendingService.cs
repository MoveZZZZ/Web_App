using System.Net;
using System.Net.Mail;

namespace Web_App.Rest.Authorization.Services
{
    public class MailSendingService
    {
        private readonly IConfiguration _configuration;
        public MailSendingService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public void SendMailWithEmailVerify(string email, string uid)
        {
            MailMessage message = new MailMessage();
            string mailOrigin = "krwa.shop@gmail.com";
            string mailAppKey = "xvbbqwbtfszivpbd";
            message.From = new MailAddress(mailOrigin);
            message.Subject = "Verify Email";
            message.To.Add(new MailAddress(email));
            message.Body = ("<html><body>Your email verification link is: https://localhost:44456/mailverification/" + uid + " </body></html>");
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
            string mailOrigin = "krwa.shop@gmail.com";
            string mailAppKey = "xvbbqwbtfszivpbd";
            message.From = new MailAddress(mailOrigin);
            message.Subject = "Password Recovery Link";
            message.To.Add(new MailAddress(email));
            message.Body = ("<html><body>Your password recovery link is: https://localhost:44456/recoverypage/" + uid + " </body></html>");
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

using System.Net;
using System.Net.Mail;

namespace Web_App.Rest.Authorization.Services
{
    public class MailSendingService
    {
        private readonly IConfiguration _configuration;
        private string mailOrigin = "krwa.shop@gmail.com";
        private string mailAppKey = "xvbbqwbtfszivpbd";
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
        public void SendMailByUserAuthDataChange(string email, string subject)
        {
            MailMessage message = new MailMessage();
            message.From = new MailAddress(mailOrigin);
            message.Subject = "Your personal data were change";
            message.To.Add(new MailAddress(email));
            message.Body = ("<html><body>Your personal data ("+ subject +") were change, if that was not you, please contact with support</body></html>");
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
            message.From = new MailAddress(mailOrigin);
            message.Subject = "Your account were removed";
            message.To.Add(new MailAddress(email));
            message.Body = ("<html><body>Your account were successfuly removed, we hope to see you again!</body></html>");
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

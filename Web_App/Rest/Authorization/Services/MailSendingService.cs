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
            using (StreamReader reader = System.IO.File.OpenText("Rest/Authorization/MailResources/VerifyEmail.html"))
            {
                string mailBody = reader.ReadToEnd();
                mailBody = mailBody.Replace("VERIFYEMAIL", IP + "/mailverification/" + uid);
                message.Body = mailBody;
            }
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
            using (StreamReader reader = System.IO.File.OpenText("Rest/Authorization/MailResources/VerifyEmail.html"))
            {
                string mailBody = reader.ReadToEnd();
                mailBody = mailBody.Replace("VERIFYEMAIL", IP + "/verifychangedmail/" + uid);
                message.Body = mailBody;
            }
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
            using (StreamReader reader = System.IO.File.OpenText("Rest/Authorization/MailResources/RecoveryPassword.html"))
            {
                string mailBody = reader.ReadToEnd();
                mailBody = mailBody.Replace("RECOVERYLINK", IP + "/recoverypage/" + uid);
                message.Body = mailBody;
            }
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
            message.Subject = "Your " + subject.ToLower() + "  has been changed";
            message.To.Add(new MailAddress(email));
            using (StreamReader reader = System.IO.File.OpenText("Rest/Authorization/MailResources/DataChange.html"))
            {
                string mailBody = reader.ReadToEnd();
                mailBody = mailBody.Replace("DATACHANGE", subject.ToLower());
                message.Body = mailBody;
            }
            message.IsBodyHtml = true;
            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential(mailOrigin, mailAppKey),
                EnableSsl = true,
            };
            smtpClient.Send(message);
        }
        public void SendMailByAccountRemove(string email, string username)
        {
            MailMessage message = new MailMessage();
            string mailOrigin = _configuration["MailService:Origin"];
            string mailAppKey = _configuration["MailService:ApplicationKey"];
            message.From = new MailAddress(mailOrigin);
            message.Subject = "Your account has been deleted";
            message.To.Add(new MailAddress(email));
            using (StreamReader reader = System.IO.File.OpenText("Rest/Authorization/MailResources/RemoveAccount.html"))
            {
                string mailBody = reader.ReadToEnd();
                mailBody = mailBody.Replace("USERNAME", username);
                message.Body = mailBody;
            }
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
            using (StreamReader reader = System.IO.File.OpenText("Rest/Authorization/MailResources/Admin2Step.html"))
            {
                string mailBody = reader.ReadToEnd();
                string authLink = IP + uid;
                mailBody = mailBody.Replace("httpsLINK", IP + "/oauth/" + uid);
                mailBody = mailBody.Replace("VER_CODE", otp);
                message.Body = mailBody;
            }
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
            using (StreamReader reader = System.IO.File.OpenText("Rest/Authorization/MailResources/BlockAccount.html"))
                message.Body = reader.ReadToEnd();
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

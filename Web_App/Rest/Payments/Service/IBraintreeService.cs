using Braintree;

namespace Web_App.Rest.Payments.Service
{
    public interface IBraintreeService
    {
        IBraintreeGateway CreateGateway();
        IBraintreeGateway GetGateway();
    }
}

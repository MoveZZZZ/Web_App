using Web_App.Rest.AccessPoint.Model;

namespace Web_App.Rest.AccessPoint.Repository
{
    public interface IAccessPointRepository
    {
        List<AccessPointModel> GetAllAccessPointStateAndCity(string state, string city);
        public List<string> GetAllCountryAccessPoint();
        public List<string> GetAllStateAPTheCoutry(string country);
        public List<string> GetAllCitysAPTheState(string state);
    }
}

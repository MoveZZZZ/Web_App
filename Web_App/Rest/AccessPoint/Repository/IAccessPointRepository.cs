using Web_App.Rest.AccessPoint.Model;

namespace Web_App.Rest.AccessPoint.Repository
{
    public interface IAccessPointRepository
    {
        List<AccessPointModel> GetAllAccessPointState(string state);
        List<AccessPointModel> GetAllAccessPointStateAndCity(string state, string city);
        public List<string> GetAllCityAccessPoint();
        public List<string> GetAllStateAccessPoint();
        public List<string> GetAllCitysAPTheState(string state);
    }
}

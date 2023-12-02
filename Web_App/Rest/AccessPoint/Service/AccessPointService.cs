using Web_App.Rest.AccessPoint.Model;
using Web_App.Rest.AccessPoint.Repository;

namespace Web_App.Rest.AccessPoint.Service
{
    public class AccessPointService
    {
        private IAccessPointRepository _accessPointRepository;

        public AccessPointService()
        {
            _accessPointRepository = new AccessPointRepository();
        }

        public List<string> getAllPointsCountry()
        {
            List<string> data = new List<string>();
            data = _accessPointRepository.GetAllCountryAccessPoint();
            return data;
        }

        public List<string> getAllPointsStateTheCountry(string country)
        {
            List<string> data = new List<string>();
            data = _accessPointRepository.GetAllStateAPTheCoutry(country);
            return data;
        }
        public List<AccessPointModel> getAllPointsTheCity(string state, string city)
        {
            List<AccessPointModel> accessPointModels = new List<AccessPointModel>();
            accessPointModels = _accessPointRepository.GetAllAccessPointStateAndCity(state, city);
            return accessPointModels;
        }

        public List<string> getAllCitysAPTheState(string state)
        {
            List<string> data = new List<string>();
            data = _accessPointRepository.GetAllCitysAPTheState(state);
            return data;
        }


    }
}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web_App.Rest.AccessPoint.Model;
using Web_App.Rest.AccessPoint.Service;

namespace Web_App.Rest.AccessPoint.Controller
{
    [Route("accesspoint")]
    [ApiController]
    [Authorize]
    public class AccessPointController : ControllerBase
    {
        AccessPointService _accessPointService = new AccessPointService();

        public AccessPointController()
        {
            _accessPointService = new AccessPointService();
        }

        [HttpGet]
        [Route("getallaccesspointcountry")]
        public IActionResult GetAllAccessPointCountry()
        {
            List<string> response = new List<string>();
            response = _accessPointService.getAllPointsCountry();
            return Ok(new { Countries = response });
        }

        [HttpGet]
        [Route("getallaccesspointstatethecountry")]
        public IActionResult GetAllAccessPointState([FromQuery] string Country)
        {
            List<string> response = new List<string>();
            response = _accessPointService.getAllPointsStateTheCountry(Country);

            return Ok(new { States = response });
        }

        [HttpGet]
        [Route("getallaccesspointcity")]
        public IActionResult GetAccessPointCity()
        {
            List<string> response = new List<string>();
            response = _accessPointService.getAllPointsCity();
            return Ok(new { Citys = response });
        }

        [HttpPost]
        [Route("getallaccesspointthestate")]
        public IActionResult GetAccessPointTheState([FromQuery] string State)
        {
            List<AccessPointModel> response = new List<AccessPointModel>();
            response = _accessPointService.getAllPointsTheState(State);
            return Ok(new { AccesPoints = response });
        }

        [HttpPost]
        [Route("getallaccesspointthestateandcity")]
        public IActionResult GetAccessPointsTheStateAndCity([FromQuery] string State, string City)
        {
            List<AccessPointModel> response = new List<AccessPointModel>();
            response = _accessPointService.getAllPointsTheCity(State, City);
            return Ok(new { AccesPoints = response });
        }

        [HttpPost]
        [Route("getallcitysthestate")]
        public IActionResult GetAllCitysAPTheState([FromQuery] string State)
        {
            List<string> response = new List<string>();
            response = _accessPointService.getAllCitysAPTheState(State);
            return Ok(new { Citys = response });
        }
    }
}

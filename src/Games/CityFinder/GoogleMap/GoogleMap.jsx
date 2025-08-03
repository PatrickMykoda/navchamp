import './GoogleMap.css';
import europeanCities from '../../../assets/city_list.js';

let map;

///////////////////////////////
// Initialization of the map //
///////////////////////////////
async function initMap() {
  
  // Requesting the necessary Google libraries
  const { Map } = await google.maps.importLibrary("maps");
  const mapCenter = new google.maps.LatLng( 47.35953600, 8.63564520)
  
  var mapProp= {
    center: mapCenter,
    zoom:5,
    mapTypeId: 'satellite',
    mapId: '57498141ca96e113a876ee44',
    disableDefaultUI: true
  };

  // The map, centered at London
  map = new Map(document.getElementById("map"), mapProp);
  map.setTilt(45);
}

initMap();


const GoogleMap = () => {
    return (
        <>
            <div id="map"></div>
        </>
    )
}

export default GoogleMap;
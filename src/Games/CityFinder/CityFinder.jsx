import './CityFinder.css';
import Instruction from './Instruction/Instruction.jsx'
import GoogleMap from './GoogleMap/GoogleMap.jsx';
import { useRef, useState, useEffect } from 'react';
import { getRandomCity, checkLocation, markCorrectGuess, markWrongGuess } from './utils/gameLogic.js';

const CityFinder = () => {
  const [map, setMap] = useState(null);
  let currentCity = getRandomCity();
  const instructionRef = useRef();

  useEffect(() => {
    const initializeMap = async () => {
      const mapInstance = await initMap();
      setMap(mapInstance);
    }

    initializeMap();
  }, []);



  async function initMap() {
    // Requesting the necessary Google libraries
    const { Map } = await google.maps.importLibrary("maps");
    const mapCenter = new google.maps.LatLng( 47.35953600, 8.63564520)
    
    const mapProp= {
      center: mapCenter,
      zoom:5,
      mapTypeId: 'satellite',
      mapId: '57498141ca96e113a876ee44',
      disableDefaultUI: true
    };

    // The map, centered at London
    const mapInstance = new Map(document.getElementById("map"), mapProp);
    mapInstance.setTilt(45);
    mapInstance.setOptions({draggableCursor: "url(./src/Games/CityFinder/assets/map_pin.svg) 500 670, pointer"});


    // Set up event listener
    google.maps.event.addListener(mapInstance, 'click', function(event) {
      let currentCityLocation = new google.maps.LatLng(currentCity.lat, currentCity.lng);
      const guess = checkLocation(event.latLng, currentCityLocation);
      if (guess === true) {
        markCorrectGuess(event.latLng, currentCityLocation, mapInstance);
        console.log("Correct guess! The city is:", currentCity.name);
        currentCity = getRandomCity(); // Get a new city for the next round
      
        // Update only the Instruction component
        if (instructionRef.current) {
          instructionRef.current.updateCity(currentCity);
        }
      } else {
        markWrongGuess(event.latLng, mapInstance);
        console.log("Wrong guess! Try again. You should find:", currentCity.name);
      }
    });

    return mapInstance;
  }

  return (
    <div id="city-finder">
        <Instruction ref={instructionRef} initialCity={currentCity} map={map} />
        <GoogleMap />
    </div>
  );
}

export default CityFinder;
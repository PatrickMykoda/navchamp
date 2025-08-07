import europeanCities from "../assets/city_list";
const { AdvancedMarkerElement, PinElement  } = await google.maps.importLibrary("marker");

// GET RANDOM CITY
// returns a random city from the list of European cities
// the list is imported from the assets folder
// the list is an array of objects with properties: name, lat, lng
// the function returns a random object from the array
const getRandomCity = () => {
    var randomNumber = Math.floor(Math.random() * europeanCities.length);
    return europeanCities[randomNumber];
}

// CHECK LOCATION
// checks if the clicked location is within a certain distance from the current city
// the function takes two parameters: click (the location clicked by the user) and currentCityLocation (the location of the current city)
const checkLocation = (click, currentCityLocation) => {
  if (Math.abs(click.lat() - currentCityLocation.lat()) < 0.1 && Math.abs(click.lng() - currentCityLocation.lng()) < 0.1){
    return true;
  } else {
    return false;
  }
}

// CORRECT GUESS
// This function adds a circle around the city that's been found and adds an marker with an info window
function markCorrectGuess(click, currentCityLocation, map){
    var circleCity = new google.maps.Circle({
        center: currentCityLocation,
        radius:10000,
        strokeColor:"#0000FF",
        strokeOpacity:0.4,
        strokeWeight:2,
        fillColor:"#0000FF",
        fillOpacity:0.2
    });
    circleCity.setMap(map);

    // Creating Marker with Advanced Marker Element
    const pinImage = document.createElement("img");
    pinImage.src = "./src/Games/CityFinder/assets/map_pin_even_smaller.png";

    const markerCity = new google.maps.marker.AdvancedMarkerElement({
        map,
        position: click,
        content: pinImage,
    });
      
    markerCity.setMap(map);
    smoothZoomWorkarround(11, currentCityLocation, map);
}

//WRONG GUESS
// This function adds an animated marker in case of a wrong guess
function markWrongGuess(click, map){
  const failImage = document.createElement("img");
  failImage.setAttribute("class", "fail-icon");
  failImage.src = "./src/Games/CityFinder/assets/small_fail_icon.png";

  const markerFail = new google.maps.marker.AdvancedMarkerElement({
      position: click,
      content: failImage,
  });

  markerFail.setMap(map);

  setTimeout(()=>{
    markerFail.setMap();
  }, 500)
}

// SMOOTH ZOOM
//This function makes the map zoom smoothely to the desired location
function smoothZoomWorkarround(desiredZoom, desiredLocation, map) {
  var initialZoom = map.getZoom();
  var initialCenter = map.getCenter();

  map.panTo(desiredLocation);

  const smoothZoom = (zoomValue) => {
    if (zoomValue < desiredZoom){
      window.setTimeout(() => {
        zoomValue += 1;
        map.setZoom(zoomValue);
        smoothZoom(zoomValue);
      }, 400);
    } else if (zoomValue > desiredZoom) {
      window.setTimeout(() => {
        zoomValue -= 1;
        map.setZoom(zoomValue);
        smoothZoom(zoomValue);
      }, 400);
    } else {
      return;
    }
  }
  smoothZoom(initialZoom);
}


// SET TIP 
// This function sets the circle on the map wich serves as the tip
function setTip(maxDist, radius, maxZoom, currentCity, map){
  console.log("The instance of the map is:", map);
  const almostLat = currentCity.lat + ranNum(maxDist);
  const almostLng = currentCity.lng + ranNum(maxDist);
  const almostCurrentCityLocation = new google.maps.LatLng(almostLat, almostLng);

  const currentTip = new google.maps.Circle({
    center: almostCurrentCityLocation,
    radius:radius,
    strokeColor:"#FF4500",
    strokeOpacity:0.8,
    strokeWeight:3,
    fillColor:"#FF4500",
    fillOpacity:0.1,
    clickable: false
  });
  currentTip.setMap(map);
    
  let zoom = map.getZoom();
  if (zoom > maxZoom) {
    zoom = maxZoom;
  }    
  smoothZoomWorkarround(zoom, almostCurrentCityLocation, map);

  return currentTip;
}

// RANDOM NUMBER
// This function returns a random number  between "maxNum" and minus "maxNum"
function ranNum(maxNum){
  let ranNum = Math.random() * maxNum;
  let posOrNeg = Math.round(Math.random());
  if (posOrNeg === 0){
    ranNum *= -1;
  }
  return ranNum;
}

// REMOVE ELEMENT
// This function removes the element from the map
function removeElement(element) {
  if (element) {
    element.setMap();
  }
}

export { getRandomCity, checkLocation, markCorrectGuess, markWrongGuess, setTip, removeElement };
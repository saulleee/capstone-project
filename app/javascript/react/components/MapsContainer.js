import React from "react";

const MapsContainer = (props) => {
  const API_KEY = "AIzaSyAKNjnh48i2SP48KVKGxbp8nXvIWDo9ZdQ";
  const URL = `https://www.google.com/maps/embed/v1/directions?key=${API_KEY}`
  const origin = "&origin="
  const destination = "&destination="
  const waypoint = "&waypoints="
  const mode = "&mode=walking&zoom=15"

  const allCoordinates = props.points.map((point) => {
    let temp = '';
    temp = temp + point.coordinates["latitude"].toString() + ',' + point.coordinates["longitude"].toString();
    return temp;
  });
  
  const length = allCoordinates.length;
  let query = '';

  if (length <= 2) {
    query = query + origin + allCoordinates[0] + destination + allCoordinates[length - 1] + mode;
  } else {
    query = query + origin + allCoordinates[0];

    const middleAddresses = allCoordinates.slice(1, -1);
    query = query + waypoint + middleAddresses[0];

    if (middleAddresses.length > 1) {
      middleAddresses.shift()
      middleAddresses.forEach(address => query = query + "|" + address);
    }

    query = query + destination + allCoordinates[length -1] + mode; 
  }

  return (
    <iframe
      src={URL.concat(query)}>
    </iframe>
  );
}

export default MapsContainer;

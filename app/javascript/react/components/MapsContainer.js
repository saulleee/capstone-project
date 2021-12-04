import React from "react";

const MapsContainer = (props) => {
  // const API_KEY = process.env.REACT_APP_MAPS_KEY;
  const API_KEY = "";
  const URL = `https://www.google.com/maps/embed/v1/directions?key=${API_KEY}`
  const origin = "&origin="
  const destination = "&destination="
  const waypoint = "&waypoints="
  const mode = "&mode=walking"

  console.log(process.env.REACT_APP_MAPS_KEY);
  
  const allAddresses = props.points.map(point => point.location.display_address.join(" ").replace(/\s+/g, '+'));
  const length = allAddresses.length;
  let query = '';
  
  if (length <= 2) {
    query = query + origin + allAddresses[0] + destination + allAddresses[length - 1];
  } else {
    query = query + origin + allAddresses[0];

    const middleAddresses = allAddresses.slice(1, -1);
    query = query + waypoint + middleAddresses[0];

    if (middleAddresses.length > 1) {
      middleAddresses.shift()
      middleAddresses.forEach(address => query = query + "|" + address);
    }

    query = query + destination + allAddresses[length -1] + mode; 
  }

  return (
    <div className="maps">
      <iframe
        src={URL.concat(query)}>
      </iframe>
    </div>  
  );
}

export default MapsContainer;

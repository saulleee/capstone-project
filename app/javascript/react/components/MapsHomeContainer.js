import React from "react";

const MapsHomeContainer = (props) => {
  const API_KEY = "AIzaSyAKNjnh48i2SP48KVKGxbp8nXvIWDo9ZdQ";
  const URL = `https://www.google.com/maps/embed/v1/place?key=${API_KEY}`
  const q = "&q="
  const zoom = "&zoom=15"
  let location = props.location;

  if (location == "" ) {
    location = "boston"
  }

  return (
    <div className="home-map">
      <iframe
        src={URL.concat(q + location + zoom)}>
      </iframe>
    </div>
  );
}

export default MapsHomeContainer;

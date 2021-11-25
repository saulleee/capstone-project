import React from "react";
import TripShow from "./TripShow";

const TripShowContainer = (props) => {
  
  const pointDescription = props.location.state.trip.map((point) => {
    return (
      <TripShow
        key={point.id}
        point={point}
      />
    );
  });
  return (
    pointDescription
  );
}

export default TripShowContainer;
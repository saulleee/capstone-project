import React from "react";
import TripShow from "./TripShow";

const TripShowContainer = (props) => {
  
  const pointDescription = props.location.state.trip.map((point, index) => {
    return (
      <TripShow
        key={`${index}_${new Date().getTime()}`}
        point={point}
      />
    );
  });

  return (
    pointDescription
  );
}

export default TripShowContainer;
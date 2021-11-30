import React from "react";
import TripShow from "./TripShow";

const TripShowContainer = (props) => {
  const pointDescription = props.location.state.trip.points.map((point) => {
    return (
      <TripShow
        key={point.yelp_id}
        point={point}
      />
    );
  });
  
  return (
    pointDescription
  );
}

export default TripShowContainer;
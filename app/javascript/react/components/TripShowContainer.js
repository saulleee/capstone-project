import React from "react";
import TripShow from "./TripShow";

const TripShowContainer = (props) => {
  const tripId = props.match.params.id;
  const trips = props.location.state.trips;

  const trip = trips.find(t => t.id == tripId);
  
  const pointDescription = trip.trip.map((point) => {
    return (
      <TripShow
        key={point.yelp_id}
        point={point}
      />
    );
  });
  
  return (
    <div>
      {pointDescription}
    </div>
  );
}

export default TripShowContainer;
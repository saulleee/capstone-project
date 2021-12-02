import React, { useState } from "react";
import TripShow from "./TripShow";
import Favorite from "./Favorite";

const TripShowContainer = (props) => {
  const [favorited, setFavorited] = useState('');

  const tripId = props.match.params.id;
  const trips = props.location.state.trips;
  const trip = trips.find(t => t.trip.trip_id == tripId);
  const points = trip.trip.points;

  const handleFavoritedState = (favorited_trip) => {
    setFavorited(favorited_trip);
  }

  const pointDescription = points.map((point) => {
    return (
      <TripShow
        key={point.yelp_id}
        point={point}
      />
    );
  });
  
  return (
    <div className="show-container-parent">
      {favorited}
      <Favorite 
        trip={trip} 
        handleFavoritedState={handleFavoritedState}
      />
      {pointDescription}
    </div>
  );
}

export default TripShowContainer;
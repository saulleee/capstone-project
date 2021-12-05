import React, { useState } from "react";
import TripShow from "./TripShow";
import Favorite from "./Favorite";
import MapsContainer from "./MapsContainer";

const TripShowContainer = (props) => {
  const [favorited, setFavorited] = useState('');
  const [error, setError] = useState('');

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
    <>
      <div className="pop-up-messages">
        <span className="pop-up-text">{error}</span>
        <span className="pop-up-text">{favorited}</span>
      </div>

      <div className="show-and-map-container">
        <div className="show-container-parent">
          <div className="show-container-div">
            <Favorite 
              trip={trip} 
              handleFavoritedState={handleFavoritedState}
              setError={setError}
            />

            {pointDescription}
          </div>
        </div>
        <div className="maps">
          <MapsContainer 
            points={points}
          />
        </div>
      </div>
    </>
  );
}

export default TripShowContainer;
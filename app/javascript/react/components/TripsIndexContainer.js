import React, { useState, useEffect } from "react";
import TripSearchContainer from "./TripSearchContainer";
import TripTile from "./TripTile";
import history from "./history";
// import ErrorContainer from "./ErrorContainer";

const TripsIndexContainer = (props) => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [favorited, setFavorited] = useState('');

  const newSearch = async (searchPayload) => {
    setError([]);
    setLoading(true);
    try {
      const response = await fetch("/api/v1/yelp/search", {
        method: "POST",
        body: JSON.stringify(searchPayload),
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      });
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        throw new Error(errorMessage);
      }
      const responseBody = await response.json();
      setTrips(responseBody);
      history.push("/trips", { trips: responseBody });
      setLoading(false);
    } catch (e) {
      setError("Please search a location");
      setTrips([]);
      setLoading(false);
      console.error(`Error in Fetch: ${e.message}`);
    }
  }

  useEffect(() => {
    if (history.state?.state.trips.length > 0) {
      setTrips([]);
      setTrips(history.state.state.trips);
    }
  }, []);

  const handleFavoritedState = (favorited_trip) => {
    setFavorited(favorited_trip);
  }
  
  const tripTiles = trips.map((trip) => {
    return (
      <TripTile
        key={trip.trip.trip_id}
        trip={trip.trip}
        trips={trips}
        // error={error}
        // setError={setError}
        // setFavorited={setFavorited}
        // error={error}
        // setError={setError}
        handleFavoritedState={handleFavoritedState}
      />
    );
  });

  return (
    <div>
      <div className="trip-search-container">
        <TripSearchContainer 
          newSearch={newSearch} 
          // error={error}
          // setError={setError}
        />
      </div>
      <div className="error-messages">
        {error}
      </div>
      {/* <div className="error-messages">
        <ErrorContainer error={error} />
      </div> */}
      {/* <div>
        {favorited}
      </div> */}
      <div className="trip-search-results">
        { loading ? <i className="fas fa-map-pin fa-spin" id="search-spinner"></i> : tripTiles }
      </div>
    </div>
  );
}

export default TripsIndexContainer;

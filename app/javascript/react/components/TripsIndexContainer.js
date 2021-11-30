import React, { useState } from "react";
import TripSearchContainer from "./TripSearchContainer";
import TripTile from "./TripTile";
import ErrorContainer from "./ErrorContainer";

const TripsIndexContainer = (props) => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);

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
      setLoading(false);
    } catch (e) {
      setError([...error, "Please search a location"]);
      setTrips([]);
      setLoading(false);
      console.error(`Error in Fetch: ${e.message}`);
    }
  }

  const tripTiles = trips.map((trip) => {
    return (
      <TripTile
        key={trip.trip.trip_id}
        trip={trip.trip}
        error={error}
        setError={setError}
      />
    );
  });

  return (
    <div>
      <div className="trip-search-container">
        <TripSearchContainer 
          newSearch={newSearch} 
          error={error}
          setError={setError}
        />
      </div>
      <div className="error-messages">
        <ErrorContainer error={error} />
      </div>
      <div className="trip-search-results">
        { loading ? <i className="fas fa-map-pin fa-spin" id="search-spinner"></i> : tripTiles }
      </div>
    </div>
  );
}

export default TripsIndexContainer;

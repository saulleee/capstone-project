import React, { useState, useEffect } from "react";
import TripSearchContainer from "./TripSearchContainer";
import TripTile from "./TripTile";
import history from "./history";
import { useLocation } from "react-router-dom";

const TripsIndexContainer = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { search } = useLocation();
  
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
      if (responseBody.error) {
        setError(responseBody.error);
        setTrips([]);
        setLoading(false);
      } else {
        setTrips(responseBody.trips);
        setLoading(false);
        history.push({pathname: "/trips", search: `q=${searchPayload.location}`}, {trips: responseBody.trips, terms: searchPayload.terms});
      }
    } catch (e) {
      setError("Something went wrong");
      setTrips([]);
      setLoading(false);
      console.error(`Error in Fetch: ${e.message}`);
    }
  }

  useEffect(() => {
    if (history.location.state?.trips.length > 0) {
      setTrips(history.location.state.trips);
    }
  }, []);
  
  const tripTiles = trips.map((trip) => {
    return (
      <TripTile
        key={trip.trip.trip_id}
        trip={trip.trip}
        trips={trips}
      />
    );
  });

  return (
    <div>
      <div className="pop-up-messages">
        <span className="pop-up-text">{error}</span>
      </div>

      <div className="trips-index-container-parent">
        <div className="trip-search-container">
          <TripSearchContainer 
            newSearch={newSearch} 
            searchQuery={search}
            // error={error}
            // setError={setError}
          />
        </div>
        
        <div className="trip-search-results">
          { loading ? <i className="fas fa-spinner fa-spin" id="search-spinner"></i> : tripTiles }
        </div>
      </div>
    </div>
  );
}

export default TripsIndexContainer;

import React, { useState, useEffect } from "react";
import history from "./history";
import TripSearchContainer from "./TripSearchContainer";
import TripTile from "./TripTile";

const TripsIndexContainer = (props) => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const newSearch = async (searchPayload) => {
    setError('');
    setLoading(true);
    const body = JSON.stringify(searchPayload);
    try {
      const response = await fetch("/api/v1/yelp/search", {
        method: "POST",
        body: body,
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
      // clear state
      history.replace('/', { trips: [], searchQuery: body });
      history.push('/', { trips: responseBody });
    } catch (error) {
      setError("Please search a location");
      setLoading(false);
      console.error(`Error in Fetch: ${error.message}`);
    }
  }

  useEffect((() => {
    if (history.location.state?.trips.length > 0) {
      // debugger
      // setTrips([])
      setTrips(history.location.state.trips)
    }
  }), [])

  const tripTiles = trips.map((trip) => {
    return (
      <TripTile
        key={trip.id}
        id={trip.id}
        trip={trip.trip}
      />
    );
  });

  console.log(history);

  return (
    <div>
      <TripSearchContainer newSearch={newSearch} />
      <p>{error}</p>
      { loading ? <i className="fas fa-spinner fa-spin"></i> : tripTiles }
    </div>
  );
}

export default TripsIndexContainer;

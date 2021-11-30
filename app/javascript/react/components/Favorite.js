import React from "react";

const Favorite = (props) => {
  const trip = props.trip;
  const error = props.error;
  const setError = props.setError;
  
  const newFavorite = async (trip) => {
    try {
      const response = await fetch(`/api/v1/trips/${trip.trip.id}/favorite_trips`, {
        method: "POST",
        body: JSON.stringify(trip),
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
    } catch (e) {
      setError([...error, "Please log in"]);
      console.error(`Error in Fetch: ${e.message}`);
    }
  }

  return (
    <div>
    <form onSubmit={(e)=>{e.preventDefault(), newFavorite(trip)}}>
      <input type='submit' value='⭐️' />
    </form>
  </div>
  );
}

export default Favorite;
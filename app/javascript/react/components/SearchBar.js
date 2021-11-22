import React, { useState, useEffect } from "react";

const SearchBar = (props) => {
  const [searchString, setSearchString] = useState('');
  const [results, setResults] = useState([]);

  const handleChange = (event) => {
    const newSearchString = event.target.value;
    setSearchString(newSearchString);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const body = JSON.stringify({
      location: searchString
    });
    try {
      const response = await fetch("/api/v1/yelps/search", {
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
      setResults(responseBody.businesses);
    } catch (error) {
      console.error(`Error in Fetch: ${error.message}`);
    }
  }

  const trips = results.map((trip) => {
    return(
      <li>{trip.name} ------------- {trip.location.display_address[0]} {trip.location.display_address[1]}</li>
    )
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Search</label>
        <input type='text' name='searchString' value={searchString} onChange={handleChange} />

        <input type='submit' value='Submit' />
      </form>
      <ul>{trips}</ul>
    </div>
  );
}

export default SearchBar;
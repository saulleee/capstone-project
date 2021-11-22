import React, { useState } from "react";

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
      setResults(responseBody.businesses);
    } catch (error) {
      console.error(`Error in Fetch: ${error.message}`);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Search</label>
        <input type='text' name='searchString' value={searchString} onChange={handleChange} />

        <input type='submit' value='Submit' />
      </form>
    </div>
  );
}

export default SearchBar;
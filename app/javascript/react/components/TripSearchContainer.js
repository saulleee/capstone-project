import React, { useState } from "react";

const TripSearchContainer = (props) => {
  const [location, setLocation] = useState('');

  const handleChange = (event) => {
    const newLocation = event.target.value;
    setLocation(newLocation);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let submissionPost = {
      location: location
    }
    props.newSearch(submissionPost);
    setLocation(location);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Search</label>
        <input type='text' name='location' value={location} onChange={handleChange} />
    
        <input type='submit' value='Submit' />
      </form>
    </div>
  );
}

export default TripSearchContainer;
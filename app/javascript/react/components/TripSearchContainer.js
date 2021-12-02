import React, { useState, useEffect } from "react";
import { terms } from "./utilities/terms";
import { Checklist } from "./Checklist";
import SearchBar from "./SearchBar";

const TripSearchContainer = (props) => {
  const [location, setLocation] = useState(props.searchQuery.replace("?q=", ""));
  const [isChecked, setIsChecked] = useState(
    new Array(terms.length).fill(false)
  );
  const error = props.error;
  const setError = props.setError;
  const newSearch = props.newSearch;

  const handleOnChangeCheck = (position) => {
    const updatedIsChecked = isChecked.map((item, index) =>
      index === position ? !item : item
    );

    setIsChecked(updatedIsChecked);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // if (isChecked.every(term => term === false))
    let searchPayload = {
      location: location,
      terms: isChecked
    }
    newSearch(searchPayload);
  }

  const checklist = terms.map((term, index) => {
    return (
      <Checklist 
        key={index}
        term={term}
        index={index}
        isChecked={isChecked}
        handleOnChangeCheck={handleOnChangeCheck}
      />
    );
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="search">
          <SearchBar 
            location={location}
            setLocation={setLocation}
          />

          <div className="checklist-container">
            {checklist}
          </div>
          
          <input className="search-button" type='submit' value='Search' />
        </div>
      </form>
    </div>
  );
}

export default TripSearchContainer;
import React, { useState } from "react";
import { terms } from "./utilities/terms";
import { Checklist } from "./Checklist";

const TripSearchContainer = (props) => {
  const [location, setLocation] = useState('');
  const [isChecked, setIsChecked] = useState(
    new Array(terms.length).fill(false)
  );

  const handleOnChangeCheck = (position) => {
    const updatedIsChecked = isChecked.map((item, index) =>
      index === position ? !item : item
    );

    setIsChecked(updatedIsChecked);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let searchPayload = {
      location: location,
      terms: isChecked
    }
    props.newSearch(searchPayload);
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
        <label>Search</label>
        <input type='text' name='location' placeholder="Boston" value={location} onChange={(e)=>setLocation(e.target.value)} />

        <div>
          {checklist}
        </div>
        
        <input type='submit' value='Submit' />
      </form>
    </div>
  );
}

export default TripSearchContainer;
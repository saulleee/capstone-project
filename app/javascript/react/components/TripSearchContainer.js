import React, { useState } from "react";

const terms = [
  { term: "breakfast" },
  { term: "brunch" },
  { term: "lunch" },
  { term: "cafe" },
  { term: "attractions" },
  { term: "dinner" },
  { term: "dessert" },
  { term: "bar" },
  { term: "nightlife" }
];

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
    let submissionPost = {
      location: location,
      terms: isChecked
    }
    props.newSearch(submissionPost);
  }

  const checkList = terms.map((term, index) => {
    return (
      <li key={index}>
        <div>
          <input
            type="checkbox"
            id={`custom-checkbox-${index}`}
            name={term}
            value={term}
            checked={isChecked[index]}
            onChange={() => handleOnChangeCheck(index)}
          />
          <label htmlFor={`custom-checkbox-${index}`}>{term.term}</label>
        </div>
      </li>
    );
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Search</label>
        <input type='text' name='location' placeholder="Boston" value={location} onChange={(e)=>setLocation(e.target.value)} />

        <div>
          {checkList}
        </div>
        
        <input type='submit' value='Submit' />
      </form>
    </div>
  );
}

export default TripSearchContainer;
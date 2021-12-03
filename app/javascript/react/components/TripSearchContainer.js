import React, { useState, useEffect } from "react";
import { terms } from "./utilities/terms";
import { Checklist } from "./Checklist";
import SearchBar from "./SearchBar";
import { default as ReactSelect } from "react-select";
import { components } from "react-select";

const TripSearchContainer = (props) => {
  const [location, setLocation] = useState(props.searchQuery.replace("?q=", ""));
  const [isChecked, setIsChecked] = useState(
    new Array(terms.length).fill(false)
  );
  const error = props.error;
  const setError = props.setError;
  const newSearch = props.newSearch;

  // const handleOnChangeCheck = (position) => {
  //   const updatedIsChecked = isChecked.map((item, index) =>
  //     index === position ? !item : item
  //   );

  //   setIsChecked(updatedIsChecked);
  // }

  const [optionSelected, setOptionSelected] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    // if (isChecked.every(term => term === false))
    let searchPayload = {
      location: location,
      terms: optionSelected
    }
    newSearch(searchPayload);
  }

  // const checklist = terms.map((term, index) => {
  //   return (
  //     <Checklist 
  //       key={index}
  //       term={term}
  //       index={index}
  //       isChecked={isChecked}
  //       handleOnChangeCheck={handleOnChangeCheck}
  //     />
  //   );
  // });
  
  
  const Option = (props) => {
    return (
      <div>
        <components.Option {...props}>
          <input
            type="checkbox"
            checked={props.isSelected}
            onChange={() => null}
            />{" "}
          <label>{props.label}</label>
        </components.Option>
      </div>
    );
  };
  
  const handleChange = (selected) => {
    setOptionSelected(selected);
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="search">
          <SearchBar 
            location={location}
            setLocation={setLocation}
          />

          {/* <div className="checklist-container">
            {checklist}
          </div> */}



          <ReactSelect
            options={terms}
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            components={{
              Option
            }}
            onChange={handleChange}
            allowSelectAll={true}
            value={optionSelected}
          />



          
          <input className="search-button" type='submit' value='Search' />
        </div>
      </form>
    </div>
  );
}

export default TripSearchContainer;
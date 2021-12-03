import React, { useState, useEffect } from "react";
import { terms } from "./utilities/terms";
import SearchBar from "./SearchBar";
import { default as ReactSelect } from "react-select";
import { components } from "react-select";
// import { customStyles } from "./utilities/customStyles";

const TripSearchContainer = (props) => {
  const [location, setLocation] = useState(props.searchQuery.replace("?q=", ""));
  const [optionSelected, setOptionSelected] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    let searchPayload = {
      location: location,
      terms: optionSelected
    }
    props.newSearch(searchPayload);
  }
  
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

          <div className="react-select">
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
              placeholder={"select your points of interest"}
              // styles={customStyles}
            />
          </div>

          <input className="search-button" type='submit' value='Search' />
        </div>
      </form>
    </div>
  );
}

export default TripSearchContainer;
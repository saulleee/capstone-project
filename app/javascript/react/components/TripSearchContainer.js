import React, { useState } from "react";
import { terms } from "./utilities/terms";
// import { Checklist } from "./Checklist";

import { default as ReactSelect } from "react-select";
import { components } from "react-select";



const TripSearchContainer = (props) => {
  const [location, setLocation] = useState('');
  // const [isChecked, setIsChecked] = useState(
  //   new Array(terms.length).fill(false)
  // );

  // const handleOnChangeCheck = (position) => {
  //   const updatedIsChecked = isChecked.map((item, index) =>
  //     index === position ? !item : item
  //   );

  //   setIsChecked(updatedIsChecked);
  // }

  const [optionSelected, setOptionSelected] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    let submissionPost = {
      location: location,
      terms: optionSelected
    }
    props.newSearch(submissionPost);
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
          <div className="search-bar" id="search-bar-effect">
            <span id="mag-img">
              <svg className="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z">
                </path>
              </svg>
            </span>
            <input id="search-container-input" type='text' autoFocus="on" name='location' placeholder="Boston" value={location} onChange={(e)=>setLocation(e.target.value)} />
          </div>

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
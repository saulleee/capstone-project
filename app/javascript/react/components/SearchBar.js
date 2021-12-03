import React from "react";

const SearchBar = (props) => {
  const onChangeHandler = (event) => {
    props.setLocation(event.target.value);
  }

  return (
    <div className="search-bar" id="search-bar-effect">
      <span id="bar-icon">
        <svg className="svg" xmlns="http://www.w3.org/2000/svg">
          <path d="M 6 0 a 6 6 0 0 1 6 6 c 0 3 -2 6.5 -6 10.5 C 2 12.5 0 9 0 6 a 6 6 0 0 1 6 -6 Z m 0 3.5 a 2.5 2.5 0 1 0 0 5 a 2.5 2.5 0 0 0 0 -5 Z" fill="#A2A2A2">
          </path>
        </svg>
      </span>
      <input id="search-container-input" type='text' autoFocus="on" name='location' placeholder="location" value={props.location} onChange={onChangeHandler} />
    </div>
  );
}

export default SearchBar;

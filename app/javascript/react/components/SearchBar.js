import React from "react";

const SearchBar = (props) => {
  const onChangeHandler = (event) => {
    props.setLocation(event.target.value);
  }

  return (
    <div className="search-bar" id="search-bar-effect">
      <input id="search-container-input" type='text' autoFocus="on" name='location' placeholder="where do you want to go?" value={props.location} onChange={onChangeHandler} />
    </div>
  );
}

export default SearchBar;

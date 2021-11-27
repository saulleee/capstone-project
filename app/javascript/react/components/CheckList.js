import React from "react";

export const Checklist = (props) => {
  return (
    <li>
    <div>
      <input
        type="checkbox"
        id={`custom-checkbox-${props.index}`}
        name={props.term}
        value={props.term}
        checked={props.isChecked[props.index]}
        onChange={() => props.handleOnChangeCheck(props.index)}
      />
      <label htmlFor={`custom-checkbox-${props.index}`}>{props.term.term}</label>
    </div>
  </li>
  );
}
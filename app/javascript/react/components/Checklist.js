import React from "react";

export const Checklist = (props) => {
  return (
    <div>
      <input
        type="checkbox"
        id={`custom-checkbox-${props.index}`}
        className="checkbox"
        name={props.term}
        value={props.term}
        checked={props.isChecked[props.index]}
        onChange={() => props.handleOnChangeCheck(props.index)}
      />
      <span className="checkbox-span" htmlFor={`custom-checkbox-${props.index}`}>{props.term.term}</span>
    </div>
  );
}

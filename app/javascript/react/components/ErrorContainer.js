import React from "react";

const ErrorContainer = ((props) => {  
  const errors = props.error.map((message) => {
    return (
      <div>
        <p>{message}</p>
      </div>
    );
  });

  return (
    errors
  );
});

export default ErrorContainer;

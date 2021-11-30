import React from "react";

const ErrorContainer = ((props) => {  
  const errors = props.error.map((message, index) => {
    return (
      <div key={index}>
        <p>{message}</p>
      </div>
    );
  });

  return (
    errors
  );
});

export default ErrorContainer;

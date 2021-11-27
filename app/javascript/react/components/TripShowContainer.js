import React from "react";
import history from "./history";
import TripShow from "./TripShow";

const TripShowContainer = (props) => {
  const pointDescription = props.location.state.trip.map((point) => {
    return (
      <TripShow
        key={point.id}
        point={point}
      />
    );
  });

  console.log(history);

  return (
    <div>
      <button onClick={history.goBack}>Back</button>
      {pointDescription}
    </div>
  );
}

export default TripShowContainer;
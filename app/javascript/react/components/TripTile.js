import React from "react";
import history from "./history";

const TripTile = (props) => {
  const pointDescription = props.trip.points.map((point) => {
    const categories = point.categories.map((category) => {
      return category.title;
    });
    
    return (
      <li key={point.yelp_id}>
        <p className="point-name-tile">{point.name}</p>
        <p className="point-rating-tile">{point.rating} ⭐️ ({point.review_count})</p>
        <p className="point-categories-tile">Categories: {categories.join(", ")}</p>
      </li>
    )
  });
  
  const handleClick = () => {
    history.push(`/trips/${props.trip.trip_id}`, { trips: props.trips });
  }

  const points = props.trip.points;

  return (
    <div className="trip-tile" onClick={handleClick}>
      <ol>
        {pointDescription}
      </ol>
    </div>
  );
}

export default TripTile;

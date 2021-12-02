import React from "react";
import history from "./history";

const TripTile = (props) => {
  const pointDescription = props.trip.map((point) => {
    const categories = point.categories.map((category) => {
      return category.title;
    });
    
    return (
      <li key={point.id}>
        Name: {point.name} | Categories: {categories.join(", ")} | Rating: {point.rating} | Reviews: {point.review_count} | Address: {point.location.address1}
      </li>
    )
  });
  
  const handleClick = () => {
    history.push(`/trips/${props.id}`, { trips: props.trips });
  }

  return (
    <div className="trip-tile" onClick={handleClick}>
      <ol>
        {pointDescription}
      </ol>
    </div>
  );
}

export default TripTile;

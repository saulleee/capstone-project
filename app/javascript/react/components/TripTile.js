import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Favorite from "./Favorite";

const TripTile = (props) => {
  // const [trip, setTrip] = useState([]);

  const pointDescription = props.trip.points_attributes.map((point) => {
    const categories = point.categories.map((category) => {
      return category.title;
    });
    
    return (
      <li key={point.id}>
        Name: {point.name} | Categories: {categories.join(", ")} | Rating: {point.rating} | Reviews: {point.review_count} | Address: {point.location.address1}
      </li>
    )
  });
  
  // useEffect(() => {
  //   setTrip(trip);
  // }, []);
  // debugger;
  
  return (
    <div className="trip-tile">
      <Favorite trip={props} />
      <Link 
        to={{
          pathname: `/trips/${props.trip.id}`,
          state: props
        }}
      >
        <ol>
          {pointDescription}
        </ol>
      </Link>
    </div>
  );
}

export default TripTile;

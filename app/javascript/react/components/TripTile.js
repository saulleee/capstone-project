import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Favorite from "./Favorite";

const TripTile = (props) => {
  const [tripState, setTripState] = useState([]);
  const trip = props.trip.trip;

  const pointDescription = trip.points.map((point) => {
    const categories = point.categories.map((category) => {
      return category.title;
    });
    
    return (
      <li key={point.id}>
        Name: {point.name} | Categories: {categories.join(", ")} | Rating: {point.rating} | Reviews: {point.review_count} | Address: {point.location.address1}
      </li>
    )
  });
  
  useEffect(() => {
    setTripState(tripState);
  }, []);

  return (
    <>
      <Favorite trip={props.trip} />
      <Link 
      to={{
        pathname: `/trips/${trip.id}`,
        state: tripState
      }}
      >
        <div>
          <ol>
            {pointDescription}
          </ol>
        </div>
      </Link>
    </>
  );
}

export default TripTile;

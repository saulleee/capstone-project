import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TripTile = (props) => {
  const [points, setPoints] = useState([]);

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
  
  useEffect(() => {
    setPoints(props);
  }, []);

  return (
    <div className="trip-tile">
      <Link 
        to={{
          pathname: `/trips/${props.id}`,
          state: points
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

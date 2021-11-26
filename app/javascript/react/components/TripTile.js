import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TripTile = (props) => {
  const [points, setPoints] = useState([]);

  const pointDescription = props.trip.map((point) => {
    const categories = point.categories.map((category) => {
      return category.title;
    });

    console.log(point.location.address1);
    
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
    <Link 
      to={{
        pathname: `/trips/${props.id}`,
        state: points
      }}
    >
      <div>
        <ol>
          {pointDescription}
        </ol>
      </div>
    </Link>
  );
}

export default TripTile;

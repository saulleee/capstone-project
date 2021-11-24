import React from "react";
import { Link } from "react-router-dom";

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

  return (
    <Link to={`/trips/${props.trip.id}`}>
      <div>
        <ol>
          {pointDescription}
        </ol>
      </div>
    </Link>
  );
}

export default TripTile;
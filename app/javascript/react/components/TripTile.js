import React from "react";
import { Link } from "react-router-dom";
import Favorite from "./Favorite";

const TripTile = (props) => {  
  const pointDescription = props.trip.points.map((point) => {
    const categories = point.categories.map((category) => {
      return category.title;
    });
    
    return (
      <li key={point.yelp_id}>
        Name: {point.name} | Categories: {categories.join(", ")} | Rating: {point.rating} | Reviews: {point.review_count} | Address: {point.location.address1}
      </li>
    )
  });
  
  return (
    <div className="trip-tile">
      <Favorite 
        trip={props} 
        error={props.error}
        setError={props.setError}
        favorited={props.favorited}
        setFavorited={props.setFavorited}
      />
      <Link 
        to={{
          pathname: `/trips/${props.trip.trip_id}`,
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

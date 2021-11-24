import React from "react";

const TripShow = (props) => {
  const point = props.point;

  const categories = point.categories.map((category) => {
    return category.title;
  });

  return (
    <div>
      <ul>
        <li>
          Name: <a href={point.url} target="_blank">{point.name}</a>
        </li>
        <li>
          Categories: {categories.join(", ")}
        </li>
        <li>
          Rating: {point.rating} | Reviews: {point.review_count}
        </li>
        <li>
          Address: {point.location.address1}, {point.location.city}, {point.location.state} {point.location.zip_code}
        </li>
      </ul>
    </div>
  );
}

export default TripShow;

import React from "react";

const TripShow = (props) => {
  const point = props.point;
  const categories = point.categories.map((category) => {
    return category.title;
  });

  return (
    <div className="show-parent-div">
      <div className="show-yelp-img">
        <img src={point.image_url} alt="Image from Yelp" />
      </div>
      <div className="show-description">
        <ul>
          <li>
            <a href={point.url} target="_blank">{point.name}</a>
          </li>
          <li>
            Categories: {categories.join(", ")}
          </li>
          <li>
            {point.rating} ⭐️ ({point.review_count})
          </li>
          <li>
            Address: {point.location.address1}, {point.location.city}, {point.location.state} {point.location.zip_code}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default TripShow;

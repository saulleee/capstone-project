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
          <pako>
            <a href={point.url} target="_blank" className="point-name-show">{point.name}</a>
          </pako>
          <pako>
            Categories: {categories.join(", ")}
          </pako>
          <pako>
            {point.rating} ⭐️ ({point.review_count})
          </pako>
          <pako>
            Address: {point.location.address1}, {point.location.city}, {point.location.state} {point.location.zip_code}
          </pako>
        </ul>
      </div>
    </div>
  );
}

export default TripShow;

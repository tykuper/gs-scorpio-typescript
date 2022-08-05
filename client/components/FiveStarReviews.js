import SingleStarReview from "./SingleStartReview";
import React from "react";

function FiveStarReviews(props) {
  const { ratings, numReviews } = props;

  return (
    <div className="d-flex justify-content-between align-items-center starReviews-width">
      <div>
        <SingleStarReview half={0.5} full={1} ratings={ratings} />
        <SingleStarReview half={1.5} full={2} ratings={ratings} />
        <SingleStarReview half={2.5} full={3} ratings={ratings} />
        <SingleStarReview half={3.5} full={4} ratings={ratings} />
        <SingleStarReview half={4.5} full={5} ratings={ratings} />
      </div>
      <div>
        <span>{ratings}</span>
        <span> ({numReviews} Reviews)</span>
      </div>
    </div>
  );
}

export default FiveStarReviews;

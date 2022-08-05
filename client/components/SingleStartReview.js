import { IoIosStarOutline, IoIosStarHalf, IoIosStar } from "react-icons/io";
import React from "react";

function SingleStarReview(props) {
  const { full, half, ratings } = props;

  return (
    <span className="rating">
      {ratings >= full ? (
        <IoIosStar className="fs-4" />
      ) : ratings >= half ? (
        <IoIosStarHalf className="fs-4" />
      ) : (
        <IoIosStarOutline className="fs-4" />
      )}
    </span>
  );
}

export default SingleStarReview;

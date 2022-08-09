import React from "react";

const NotFound = (props) => {
  return (
    <div>
      <h1 className="section-title">
        The page at {props.location.pathname} does not exist!
      </h1>
    </div>
  );
};

export default NotFound;

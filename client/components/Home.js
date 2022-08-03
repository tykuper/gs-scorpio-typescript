import React from "react";
import { connect } from "react-redux";

/**
 * COMPONENT
 */
export const Home = (props) => {
  // const { username } = props;

  return (
    <div className="row">
      <div className="col">
        <h1 className="text-center">Orca Audio</h1>
        <div className="row">
          <h2>Category 1</h2>
          <div className="col-md-3 col-sm-6 mb-5"></div>
        </div>
        <div className="row">
          <h2>Category 2</h2>
          <div className="col-md-3 col-sm-6 mb-5"></div>
        </div>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
// const mapState = (state) => {
//   return {
//     username: state.auth.username,
//   };
// };

export default Home;

import React from "react";
import { connect } from "react-redux";

const AddProductForm = (props) => {
  const { handleSubmit } = props;

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="row needs-validation"
        novalidate
      ></form>
    </div>
  );
};

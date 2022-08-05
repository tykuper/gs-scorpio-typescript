import React from "react";
import { connect } from "react-redux";

const AddProductForm = (props) => {
  const { handleSubmit } = props;

  return (
    <div>
      <form onSubmit={handleSubmit} className="row needs-validation" novalidate>
        <div className="col-md-4 m-4">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input name="name" type="text" className="form-control" required />
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;

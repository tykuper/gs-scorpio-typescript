import React from "react";
import { updateProductThunk } from "../store/products";
import { connect } from "react-redux";

const EditProductForm = (props) => {
  const { handleSubmit } = props;

  return (
    <div>
      <div className="m-2">
        <h1>Add a Product</h1>
      </div>
      <form onSubmit={handleSubmit} className="row needs-validation" novalidate>
        <div className="col-md-4 m-4">
          <label htmlFor="name" className="form-label">
            Name<sup>*</sup>
          </label>
          <input name="name" type="text" className="form-control" required />
        </div>
        <div className="col-md-4 m-4">
          <label htmlFor="ImageURL" className="form-label">
            ImageURL
          </label>
          <input name="ImageURL" type="url" className="form-control" />
        </div>
        <div className="col-md-4 m-4">
          <label htmlFor="shortDescription" className="form-label">
            Short Description
          </label>
          <input name="shortDescription" type="text" className="form-control" />
        </div>
        <div className="col-md-4 m-4">
          <label htmlFor="longDescription" className="form-label">
            Long Description
          </label>
          <textarea
            name="longDescription"
            type="text"
            className="form-control"
          />
        </div>
        <div className="col-md-4 m-4">
          <label htmlFor="price" className="form-label">
            Price<sup>*</sup>
          </label>
          <div className="input-group m-0">
            <span class="input-group-text">$</span>
            <input
              name="price"
              type="number"
              className="form-control"
              step="0.01"
              min="0.00"
              max="99999999.99"
            />
          </div>
        </div>
        <div className="col-md-4 m-4">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select name="category" className="form-control">
            <option value="uncategorized">None</option>
            <option value="in-ear">In-Ear</option>
            <option value="over-ear">Over-Ear</option>
          </select>
        </div>
        <div className="col-md-4 m-4">
          <label htmlFor="noiseCancelling" className="form-check-label">
            Noise Cancelling
          </label>{" "}
          <select
            name="noiseCancelling"
            className="form-control"
            onChange={handleChange}
          >
            <option value={false}>No</option>
            <option value={true}>Yes</option>
          </select>
        </div>

        <div className="d-block">
          <button className="btn btn-primary" type="submit">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductForm;

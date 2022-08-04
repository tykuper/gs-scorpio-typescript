import React from 'react';
import { Row, Col, ListGroup, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const ProductCard = (props) => {
  const {
    id,
    name,
    imageURL,
    shortDescription,
    longDescription,
    price,
    category,
    noiseCancelling,
  } = props.product;

  return (
    <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
      <div className="card mx-auto mt-5 pt-4 bg-secondary">
        <img
          className="mx-auto img-thumbnail"
          src={imageURL}
          width="auto"
          height="auto"
        />
        <div className="card-body text-center p-1">
          <Link className="card-title" to={`/products/${id}`}>
            {name}
          </Link>
          <p className="card-text">{price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

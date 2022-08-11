import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

export const ProductPagination = ({
  productsPerPage,
  totalProducts,
  paginate,
  currentPage,
}) => {
  let pageNumbers = [];
  for (
    let number = 1;
    number <= Math.ceil(totalProducts / productsPerPage);
    number++
  ) {
    pageNumbers.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => paginate(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return <Pagination>{pageNumbers}</Pagination>;
};

import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

export interface Props {
  productsPerPage: number;
  totalProducts: number;
  paginate: (number: number) => void;
  currentPage: number;
}

export const ProductPagination: React.FC<Props> = ({
  productsPerPage,
  totalProducts,
  paginate,
  currentPage,
}) => {
  let pageNumbers: any[] = [];
  for (
    let number: number = 1;
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

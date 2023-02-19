import React, { Dispatch, SetStateAction } from 'react';
import Pagination from 'react-js-pagination';
import './paging.scss';

interface PageProps {
  setPage: Dispatch<SetStateAction<number>>;
  page: number;
}

const Paging = ({ page, setPage }: PageProps) => {
  const handlePageChange = (page: React.SetStateAction<number>) => {
    setPage(page);
  };

  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={10}
      totalItemsCount={100}
      pageRangeDisplayed={5}
      prevPageText="‹"
      nextPageText="›"
      onChange={handlePageChange}
    />
  );
};

export default Paging;

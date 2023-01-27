import React from 'react';
import { FaSearch } from 'react-icons/fa';
import './Search.scss';

function Search({ children, size }: any) {
  return (
    <div className={`search ${size}`}>
      {children}
      <input
        className={`searchInput ${size}`}
        type="search"
        placeholder="유저 검색"
      />
      <FaSearch className={`searchIcon ${size}`} />
    </div>
  );
}

export default Search;

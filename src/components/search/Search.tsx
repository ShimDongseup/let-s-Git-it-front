import React from 'react';
import { FaSearch } from 'react-icons/fa';
import './Search.scss';

function Search() {
  return (
    <div className="search">
      <input className="searchInput" type="search" placeholder="아이디" />
      <FaSearch className="searchIcon" />
    </div>
  );
}

export default Search;

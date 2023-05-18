import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import { searchResults } from '../../../@types/Search';
import './Search.scss';

function Search({ size }: any) {
  const [search, setSearch] = useState<string>('');
  const [results, setResults] = useState<searchResults[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navi = useNavigate();

  // 검색결과 받기
  const handleInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    await axios.get(`api/ranks/search?userName=${e.target.value}`).then(res => {
      setResults(res.data);
    });
  };

  // 엔터키 눌렀을 때
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navi(`/userdetail/${search}`);
      setSearch('');
    }
  };

  // 모달창 영역 밖 클릭 시 창 꺼짐
  useEffect(() => {
    const clickOutside = (e: any): void => {
      if (!searchRef.current?.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', clickOutside);
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, [searchRef]);

  return (
    <div className={`search ${size}`}>
      <form className={`searchForm ${size}`}>
        <input
          className={`searchInput ${size}`}
          value={search}
          onChange={handleInput}
          onClick={() => setIsSearchOpen(true)}
          onKeyDown={handleKeyDown}
          type="search"
          placeholder="GitHub 유저 검색"
        />
        <FaSearch
          className={`searchIcon ${size}`}
          onClick={() => navi(`/userdetail/${search}`)}
        />
      </form>
      {search && isSearchOpen && results.length ? (
        <section className={`resultWrap ${size}`} ref={searchRef}>
          검색결과
          <div className={`resultList ${size}`} onClick={() => setSearch('')}>
            {results.map((data, el: number) => {
              return (
                <Link
                  className={`resultInfo ${size}`}
                  to={`/userdetail/${data.rankerName}`}
                  key={el}
                >
                  <img
                    className={`img ${size}`}
                    src={data.profileImage}
                    alt="profile Img"
                  />
                  <div>{data.rankerName}</div>
                </Link>
              );
            })}
          </div>
        </section>
      ) : null}
    </div>
  );
}

export default Search;

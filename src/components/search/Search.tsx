import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import './Search.scss';

function Search({ size }: any) {
  const [search, setSearch] = useState<string>('');
  const [results, setResults] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  // 검색시 back과 통신 후 해당 데이터 받기
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    axios
      .get(`/ranks/search?user-name=${search}`)
      .then(res => setResults(res.data));
  };

  // 모달창 영역 밖 클릭 시 창 꺼짐
  useEffect(() => {
    const clickOutside = (e: MouseEvent): void => {
      if (searchRef.current !== e.target) {
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
          type="search"
          placeholder="유저 검색"
        />
        <FaSearch className={`searchIcon ${size}`} />
      </form>
      {search && isSearchOpen && (
        <div className={`resultWrap ${size}`} ref={searchRef}>
          검색결과
          {results ? (
            <div className="resultList">
              {SEARCH_RESULT_DATAS.map(data => {
                return (
                  <Link
                    className={`resultInfo ${size}`}
                    to="/userdetail"
                    key={data.id}
                  >
                    <img
                      className={`img ${size}`}
                      src="https://cdn.pixabay.com/photo/2018/05/13/16/57/dog-3397110__480.jpg"
                      alt="profile Img"
                    />
                    <div className="tier">Tier</div>
                    <div>kby0908</div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className={`errorMsg ${size}`}>알맞은 유저가 없습니다</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;

const SEARCH_RESULT_DATAS = [
  {
    id: 1,
    img: 'https://cdn.pixabay.com/photo/2018/05/13/16/57/dog-3397110__480.jpg',
    name: 'kby008',
  },
  {
    id: 2,
    img: 'https://cdn.pixabay.com/photo/2018/05/13/16/57/dog-3397110__480.jpg',
    name: 'kby008',
  },
  {
    id: 3,
    img: 'https://cdn.pixabay.com/photo/2018/05/13/16/57/dog-3397110__480.jpg',
    name: 'kby008',
  },
];

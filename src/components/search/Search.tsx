import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import { CBASE_URL } from '../../config';
import './Search.scss';

type Results = {
  profileImage: string;
  rankerName: string;
  tierImage: string | null;
};

function Search({ size }: any) {
  const [search, setSearch] = useState<string>('');
  const [results, setResults] = useState<Results[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // 검색시 back과 통신 후 해당 데이터 받기
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
    axios
      .get(`${CBASE_URL}/ranks/search?userName=${e.target.value}`)
      .then(res => {
        setResults(res.data);
      });
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
          type="search"
          placeholder="유저 검색"
        />
        <FaSearch className={`searchIcon ${size}`} />
      </form>
      {search && isSearchOpen && (
        <div className={`resultWrap ${size}`} ref={searchRef}>
          검색결과
          {results.length ? (
            <div className="resultList">
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
                    <div className="tier">{data.tierImage}</div>
                    <div>{data.rankerName}</div>
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
    profileImage:
      'https://cdn.pixabay.com/photo/2018/05/13/16/57/dog-3397110__480.jpg',
    rankerName: 'kby008',
  },
  {
    id: 2,
    profileImage:
      'https://cdn.pixabay.com/photo/2018/05/13/16/57/dog-3397110__480.jpg',
    rankerName: 'kby008',
  },
  {
    id: 3,
    profileImage:
      'https://cdn.pixabay.com/photo/2018/05/13/16/57/dog-3397110__480.jpg',
    rankerName: 'kby008',
  },
];

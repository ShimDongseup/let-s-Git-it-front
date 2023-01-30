import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './Search.scss';

function Search({ size }: any) {
  const [search, setSearch] = useState<string>('');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className={`search ${size}`}>
      <form className={`searchForm ${size}`}>
        <input
          className={`searchInput ${size}`}
          value={search}
          onChange={handleInput}
          type="search"
          placeholder="유저 검색"
        />
        <FaSearch className={`searchIcon ${size}`} />
      </form>
      {search && (
        <div className={`resultWrap ${size}`}>
          검색결과
          <div className="resultList">
            {SEARCH_RESULT_DATAS.map(data => {
              return (
                <div className={`resultInfo ${size}`} key={data.id}>
                  <img
                    className={`img ${size}`}
                    src="https://cdn.pixabay.com/photo/2018/05/13/16/57/dog-3397110__480.jpg"
                    alt="profile Img"
                  />
                  <div className="tier">Tier</div>
                  <div>kby0908</div>
                </div>
              );
            })}
          </div>
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

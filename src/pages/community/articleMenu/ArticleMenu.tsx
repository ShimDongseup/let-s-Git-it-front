import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
// import INFO_CATEGORY_LIST from './InfoCategory';
import './articleMenu.scss';

interface MenuProps {
  setSelectedMain: Dispatch<SetStateAction<string>>;
  setSelectActive: Dispatch<SetStateAction<number>>;
  selectActive: number;
}
function ArticleMenu({
  setSelectedMain,
  setSelectActive,
  selectActive,
}: MenuProps) {
  type Category = {
    id: number;
    name: string;
    main_category_id: number;
  };
  const [selectedSearch, setSelectedSearch] = useState('제목');
  const [searchInput, setSearchInput] = useState('');
  const [menuList, setMenuList] = useState<Category[]>([]);
  const navigate = useNavigate();

  // 카테고리별 id값, 메인카테고리 확인
  const selectCategory = (id: number, mainCategory: string) => {
    setSelectActive(id);
    setSelectedMain(mainCategory);
  };

  // 글 검색 select, input 핸들링
  const handleSearch = (e: { target: { value: SetStateAction<string> } }) => {
    setSelectedSearch(e.target.value);
  };
  const handleInput = (e: { target: { value: SetStateAction<string> } }) => {
    setSearchInput(e.target.value);
  };

  // 글검색 쿼리스트링
  const [searchParams, setSearchParams] = useSearchParams();
  const searchResult = () => {
    searchParams.set('option', selectedSearch);
    searchParams.set('keyword', searchInput);
    setSearchParams(searchParams);
    // navigate(`/search?${searchParams}`);
    setSearchInput('');
    setSelectedSearch('');
  };

  // 정보 카테고리 filter
  const filterInfo = menuList.filter(
    category => category.main_category_id === 1
  );
  // 커뮤니티 카테고리 filter
  const filterCommunity = menuList.filter(
    category => category.main_category_id === 2
  );

  useEffect(() => {
    // fetch(`${IP}/community/categories`)
    fetch('./data/menuList.json')
      .then(res => res.json())
      .then(data => setMenuList(data));
  }, []);

  return (
    <div className="articleMenu">
      <div className="categoryListInner">
        <div className="articleSearch">
          <h3 className="categoryTitle">글 검색</h3>
          <select
            className="articleSelect"
            name="option"
            value={selectedSearch}
            onChange={handleSearch}
          >
            <option value="제목">제목</option>
            <option value="글쓴이">글쓴이</option>
            <option value="제목+글쓴이">제목 + 글쓴이</option>
          </select>
          <div>
            <input
              type="text"
              className="searchInput"
              placeholder="내용을 입력하세요"
              name="keyword"
              value={searchInput}
              onChange={handleInput}
            />
            <button className="articleSearchBtn" onClick={searchResult}>
              검색
            </button>
          </div>
        </div>
        <div className="categoryDivision">
          <div className="articleRegister">
            <button
              className="articleWriteBtn"
              onClick={() => navigate('/articleWrite')}
            >
              + 글쓰기
            </button>
          </div>
          <div className="categoryWrap">
            <h3 className="categoryTitle">정보</h3>
            <div className="categoryList">
              {selectActive
                ? filterInfo.map((sub, i) => {
                    return (
                      <span
                        key={i}
                        onClick={() => {
                          selectCategory(
                            sub.id,
                            sub.main_category_id.toString()
                          );
                        }}
                        className={
                          sub.id === selectActive ? 'categoryDefault' : ''
                        }
                      >
                        {sub.name}
                      </span>
                    );
                  })
                : filterInfo.map((sub, i) => {
                    return (
                      <span
                        key={i}
                        onClick={() => {
                          selectCategory(
                            sub.id,
                            sub.main_category_id.toString()
                          );
                        }}
                        className={sub.name === '자유' ? 'categoryDefault' : ''}
                      >
                        {sub.name}
                      </span>
                    );
                  })}
            </div>
          </div>

          <div className="categoryWrap">
            <h3 className="categoryTitle">커뮤니티</h3>
            <div className="categoryList">
              {selectActive
                ? filterCommunity.map((sub, i) => {
                    return (
                      <span
                        key={i}
                        onClick={() => {
                          selectCategory(
                            sub.id,
                            sub.main_category_id.toString()
                          );
                        }}
                        className={
                          sub.id === selectActive ? 'categoryDefault' : ''
                        }
                      >
                        {sub.name}
                      </span>
                    );
                  })
                : filterCommunity.map((sub, i) => {
                    return (
                      <span
                        key={i}
                        onClick={() => {
                          selectCategory(
                            sub.id,
                            sub.main_category_id.toString()
                          );
                        }}
                        className={sub.name === '자유' ? 'categoryDefault' : ''}
                      >
                        {sub.name}
                      </span>
                    );
                  })}
            </div>
          </div>

          {/* {INFO_CATEGORY_LIST.map((main, i) => {
            return (
              <div className="categoryWrap" key={i}>
                <h3 className="categoryTitle">{main.mainCategory}</h3>
                <div className="categoryList">
                  {selectActive
                    ? main.subTitle.map(sub => {
                        return (
                          <span
                            onClick={() =>
                              selectCategory(sub.id, main.mainCategory)
                            }
                            key={sub.id}
                            className={
                              sub.id === selectActive ? 'categoryDefault' : ''
                            }
                          >
                            {sub.title}
                          </span>
                        );
                      })
                    : main.subTitle.map(sub => {
                        return (
                          <span
                            onClick={() =>
                              selectCategory(sub.id, main.mainCategory)
                            }
                            key={sub.id}
                            className={
                              sub.title === '자유' ? 'categoryDefault' : ''
                            }
                          >
                            {sub.title}
                          </span>
                        );
                      })}
                </div>
              </div>
            );
          })} */}
        </div>
      </div>
    </div>
  );
}

export default ArticleMenu;

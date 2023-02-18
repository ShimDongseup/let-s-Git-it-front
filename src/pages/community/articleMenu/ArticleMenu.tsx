import React, { SetStateAction, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { BASE_URL } from '../../../config';
import {
  articleSearchKeyword,
  articleSearchOption,
  categoryState,
} from '../../../atom';
import './articleMenu.scss';

function ArticleMenu() {
  type Category = {
    id: number;
    name: string;
    mainCategoryId: number;
  };

  const [menuList, setMenuList] = useState<Category[]>([]);
  const [selectedSearch, setSelectedSearch] = useState('title');
  const [searchInput, setSearchInput] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  // recoil
  const navigate = useNavigate();
  const [active, setActive] = useRecoilState(categoryState);
  const setSearchOption = useSetRecoilState(articleSearchOption);
  const setSearchKeyword = useSetRecoilState(articleSearchKeyword);

  // 카테고리별 id값 확인
  const selectCategory = (id: number) => {
    setActive(id);
  };

  // 글 검색 select, input 핸들링
  const handleSearch = (e: { target: { value: SetStateAction<string> } }) => {
    setSelectedSearch(e.target.value);
  };
  const handleInput = (e: { target: { value: SetStateAction<string> } }) => {
    if (selectedSearch === '') {
      setSelectedSearch('title');
    }
    setSearchInput(e.target.value);
  };

  // 글검색 쿼리스트링
  const handleOnKeyDown = (e: { key: string }) => {
    if (e.key === 'Enter') {
      searchResult();
    }
  };
  const searchResult = () => {
    setActive(9);
    if (searchInput.length !== 0) {
      setSearchOption(selectedSearch);
      setSearchKeyword(searchInput);
      searchParams.set('option', selectedSearch);
      searchParams.set('keyword', searchInput);
      searchParams.delete('date');
      searchParams.delete('sort');
      setSearchParams(searchParams);
      navigate(`/articleList/9?${searchParams.toString()}`);
    } else {
      return alert('검색어를 입력하세요');
    }
    setSearchInput('');
    setSelectedSearch('');
  };

  // 정보 카테고리 filter
  const filterInfo = menuList.filter(category => category.mainCategoryId === 1);
  // 커뮤니티 카테고리 filter
  const filterCommunity = menuList.filter(
    category => category.mainCategoryId === 2
  );

  useEffect(() => {
    axios
      .get(`${BASE_URL}/community/categories`)
      .then(res => setMenuList(res.data));
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
            <option value="title">제목</option>
            <option value="author">글쓴이</option>
            <option value="title_author">제목 + 글쓴이</option>
          </select>
          <div>
            <input
              type="text"
              className="searchInput"
              placeholder="내용을 입력하세요"
              name="keyword"
              value={searchInput}
              onChange={handleInput}
              onKeyDown={handleOnKeyDown}
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
              {filterInfo.map((sub, i) => {
                return (
                  <span
                    key={i}
                    onClick={() => {
                      selectCategory(sub.id);
                      navigate(
                        `/articleList/${sub.id}?offset=0&limit=10&sort=latest`
                      );
                    }}
                    className={
                      active === 9
                        ? ''
                        : sub.id === active
                        ? 'categoryDefault'
                        : ''
                    }
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
              {filterCommunity.map((sub, i) => {
                return (
                  <span
                    key={i}
                    onClick={() => {
                      selectCategory(sub.id);
                      navigate(
                        `/articleList/${sub.id}?offset=0&limit=10&sort=latest`
                      );
                    }}
                    className={
                      active === 9
                        ? ''
                        : sub.id === active
                        ? 'categoryDefault'
                        : ''
                    }
                  >
                    {sub.name}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleMenu;

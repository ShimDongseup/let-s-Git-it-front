import React, { SetStateAction, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { BASE_URL } from '../../../config';
import { Category } from '../../../../@types/ArticleList';
import {
  articleSearchKeyword,
  articleSearchOption,
  categoryState,
  currentPage,
} from '../../../atom';
import './articleMenu.scss';

function ArticleMenu() {
  const location = useLocation();
  const [menuList, setMenuList] = useState<Category[]>([]);
  const [selectedSearch, setSelectedSearch] = useState('title');
  const [searchInput, setSearchInput] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const token = localStorage.getItem('token');
  // recoil
  const navigate = useNavigate();
  const [active, setActive] = useRecoilState(categoryState);
  const setSearchOption = useSetRecoilState(articleSearchOption);
  const setSearchKeyword = useSetRecoilState(articleSearchKeyword);
  const setCurrentPageNumber = useSetRecoilState(currentPage);

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

  const keywordExp = /[ㄱ-ㅎ가-힣a-zA-Z0-9.*+^$?!@#-`~'":<>{}()|[\]\\]/g;
  const searchResult = () => {
    const validKeyword = keywordExp.test(searchInput);
    if (
      validKeyword &&
      searchInput !== '%' &&
      searchInput !== '_' &&
      searchInput !== '\\'
    ) {
      setActive(9);
      setSearchOption(selectedSearch);
      setSearchKeyword(searchInput);
      searchParams.set('option', selectedSearch);
      searchParams.set('keyword', searchInput);
      searchParams.delete('date');
      searchParams.delete('sort');
      if (!location.pathname.includes('articleList')) {
        searchParams.set('offset', '0');
        searchParams.set('limit', '10');
      }
      setSearchParams(searchParams);
      setCurrentPageNumber(1);
      navigate(`/articleList/9?${searchParams.toString()}`);
    } else {
      alert('유효하지 않은 문자입니다.');
    }
    setSearchInput('');
    setSelectedSearch('');
  };

  const clickWrite = () => {
    if (token) {
      navigate('/articleWrite');
    } else {
      alert('로그인 후 이용해 주세요');
    }
  };

  useEffect(() => {
    try {
      axios
        .get(`${BASE_URL}/community/categories`)
        .then(res => setMenuList(res.data));
    } catch (error) {
      console.log(error);
    }
  }, []);

  // 정보 카테고리 filter
  const filterInfo = menuList.filter(category => category.mainCategoryId === 1);
  // 커뮤니티 카테고리 filter
  const filterCommunity = menuList.filter(
    category => category.mainCategoryId === 2
  );

  return (
    <aside id="articleMenu">
      <div className="categoryListInner">
        <section className="articleSearch">
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
        </section>
        <section className="categoryDivision">
          <div className="articleRegister">
            <button className="articleWriteBtn" onClick={clickWrite}>
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
        </section>
      </div>
    </aside>
  );
}

export default ArticleMenu;

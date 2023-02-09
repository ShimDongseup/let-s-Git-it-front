import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
  articleSearchKeyword,
  articleSearchOption,
  categoryState,
} from '../../../atom';
import { ArticleType } from '../articleList/ArticleList';
import './articleMenu.scss';

interface MenuProps {
  setArticleSearhList: Dispatch<SetStateAction<ArticleType[]>>;
}

function ArticleMenu({ setArticleSearhList }: MenuProps) {
  type Category = {
    id: number;
    name: string;
    main_category_id: number;
  };

  const [menuList, setMenuList] = useState<Category[]>([]);
  const [selectedSearch, setSelectedSearch] = useState('제목');
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  // localstorage
  // const [active, setActive] = useState<number>(4);
  // recoil
  const [active, setActive] = useRecoilState(categoryState);
  const [sOption, setsOption] = useRecoilState(articleSearchOption);
  const [sKeyword, setsKeyword] = useRecoilState(articleSearchKeyword);

  // 카테고리별 id값, 메인카테고리 확인
  const selectCategory = (id: number) => {
    setActive(id);
    // localstorage
    // localStorage.setItem('category', id.toString());
  };

  // 글 검색 select, input 핸들링
  const handleSearch = (e: { target: { value: SetStateAction<string> } }) => {
    setSelectedSearch(e.target.value);
  };
  const handleInput = (e: { target: { value: SetStateAction<string> } }) => {
    if (selectedSearch === '') {
      setSelectedSearch('제목');
    }
    setSearchInput(e.target.value);
  };

  // 글검색 쿼리스트링
  const [searchParams, setSearchParams] = useSearchParams();
  const searchResult = () => {
    const currentLocation = window.location.href;
    if (searchInput.length !== 0) {
      if (!currentLocation.includes('articleList')) {
        setsOption(selectedSearch);
        setsKeyword(searchInput);
        navigate('/search');
      }
    } else {
      return alert('검색어를 입력하세요');
    }
    searchParams.set('option', selectedSearch);
    searchParams.set('keyword', searchInput);
    setSearchParams(searchParams);
    setSearchInput('');
    setSelectedSearch('');
    fetch('../data/search.json')
      .then(res => res.json())
      .then(data => setArticleSearhList(data));
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
    // localstorage
    // const test = Number(localStorage.getItem('category'));
    // setActive(test);
    // fetch(`${IP}/community/categories`)
    fetch('../data/menuList.json')
      .then(res => res.json())
      .then(data => setMenuList(data));
  }, []);

  return (
    <div className="articleMenu">
      <div className="categoryListInner">
        <div className="articleSearch">
          {active}
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
              {filterInfo.map((sub, i) => {
                return (
                  <span
                    key={i}
                    onClick={() => {
                      selectCategory(sub.id);
                      navigate(`/articleList/${sub.id}`);
                    }}
                    className={
                      searchParams.get('keyword') !== null
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
                      navigate(`/articleList/${sub.id}`);
                    }}
                    className={
                      searchParams.get('keyword') !== null
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

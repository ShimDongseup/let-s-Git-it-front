import React, { useState } from 'react';
import INFO_CATEGORY_LIST from './InfoCategory';
import './articleMenu.scss';
import { useNavigate } from 'react-router-dom';

function ArticleMenu() {
  const [selectActive, setSelectActive] = useState<string>('');
  const navigate = useNavigate();
  const selectCategory = (e: React.MouseEvent<HTMLSpanElement>) => {
    setSelectActive((e.target as HTMLElement).innerText);
  };
  return (
    <div className="articleMenu">
      <div className="categoryListInner">
        <div className="articleTop">
          <img src="./image/icon/community.png" alt="community" />
        </div>
        <div className="articleRegister">
          <button
            className="articleWriteBtn"
            onClick={() => navigate('/articleWrite')}
          >
            + 글쓰기
          </button>
        </div>
        {INFO_CATEGORY_LIST.map((main, i) => {
          return (
            <div className="categoryWrap" key={i}>
              <h3 className="categoryTitle">{main.mainCategory}</h3>
              <div className="categoryList">
                {selectActive
                  ? main.subTitle.map(sub => {
                      return (
                        <span
                          onClick={selectCategory}
                          key={sub.id}
                          className={
                            sub.title === selectActive ? 'categoryDefault' : ''
                          }
                        >
                          {sub.title}
                        </span>
                      );
                    })
                  : main.subTitle.map(sub => {
                      return (
                        <span
                          onClick={selectCategory}
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
        })}
        <div className="articleSearch">
          <h3 className="categoryTitle">글 검색</h3>
          <select name="articleSelect" className="articleSelect">
            <option value="articleTitle">제목</option>
            <option value="articleWriter">글쓴이</option>
            <option value="articleAll">제목 + 글쓴이</option>
          </select>
          <div>
            <input
              type="text"
              className="searchInput"
              placeholder="내용을 입력하세요"
            />
            <button className="articleSearchBtn">검색</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleMenu;

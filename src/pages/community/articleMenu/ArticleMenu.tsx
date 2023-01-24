import React from 'react';

function ArticleMenu() {
  return (
    <div className="articleMenu">
      <div className="categoryListInner">
        <div className="articleTop">---</div>
        <div className="articleRegister">
          <button className="articleWriteBtn">+ 글쓰기</button>
        </div>
        <div className="articleSearch">
          <h3 className="catergoryTitle">글 검색</h3>
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
        <div className="categoryWrap">
          <h3 className="catergoryTitle">정보</h3>
          <div className="categoryList">
            <span>공지사항</span>
            <span>개발뉴스</span>
            <span>버그/신고</span>
          </div>
        </div>
        <div className="categoryWrap">
          <h3 className="catergoryTitle">커뮤니티</h3>
          <div className="categoryList">
            <span className="categoryDefault">자유</span>
            <span>유머</span>
            <span>질문</span>
            <span>프로젝트</span>
            <span>채용정보</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleMenu;

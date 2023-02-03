import React from 'react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import ArticleMenu from '../articleMenu/ArticleMenu';
import ArticlePost from './components/ArticlePost';
import ArticleNews from './components/ArticleNews';
import INFO_CATEGORY_LIST from '../articleMenu/InfoCategory';
import './articleList.scss';
import './components/paging.scss';
import Paging from './components/Paging';

export type ArticleType = {
  id: number;
  title: string;
  postTime: string;
  userName: string;
  image: string;
  commentNum: number;
  recommendNum: number;
  category: string;
};

function ArticleList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [articleList, setArticleList] = useState<ArticleType[]>([]);
  const [selectedMain, setSelectedMain] = useState<string>('');
  const [selectActive, setSelectActive] = useState<number>(4);
  const [articleCopyList, setArticleCopyList] = useState<ArticleType[]>([]);

  // 최신순, 인기순 클릭
  const [isLatest, setIsLatest] = useState<boolean>(true);
  const clickMenutab = () => {
    setIsLatest(!isLatest);
    if (isLatest) {
      const hotList = [...articleList];
      const comparator = (name: string): any => {
        return (prev: { [x: string]: number }, next: { [x: string]: number }) =>
          prev[name] === next[name] ? 0 : prev[name] > next[name] ? -1 : 1;
      };
      hotList.sort(comparator('recommendNum'));
      setArticleList(hotList);
    } else {
      setArticleList(articleCopyList);
    }
  };

  // 글검색 결과 fetch
  const isSearch = searchParams.toString().split('_')[0];
  useEffect(() => {
    fetch(`url/search${isSearch}`)
      .then(res => res.json())
      .then(data => {
        setArticleList(data);
        setSearchParams('');
      });
  }, [isSearch]);

  // pagination
  const [page, setPage] = useState<number>(1);

  // 카테고리별 fetch
  const articleFetch = () => {
    fetch(`../data/post.json`)
      .then(res => res.json())
      .then(data => {
        setArticleList(data);
        setArticleCopyList(data);
      });
  };
  // 서버통신
  // const IP = '';
  // const articleFetch = (selectActive: number) => {
  //   fetch(`${IP}//community/posts/list/${selectActive}`)
  //     .then(res => res.json())
  //     .then(data => setArticleList(data));
  // };
  // useEffect(() => {
  //   articleFetch(selectActive);
  //   setArticleCopyList(data);
  // }, [selectActive]);

  useEffect(() => {
    setIsLatest(true);
    articleFetch();
    // handlePageChange(page);
  }, [selectActive]);

  const findCategoryTitle = INFO_CATEGORY_LIST[0].subTitle.find(
    el => el.id === selectActive
  );

  return (
    <div className="community">
      <div className="articleInner">
        <ArticleMenu
          setSelectedMain={setSelectedMain}
          setSelectActive={setSelectActive}
          selectActive={selectActive}
        />
        <div className="articleList">
          <div className="articleListSort">
            {/* 검색결과 유 ? 검색결과 : (정보카테고리 ? 정보타이틀 : 최근/인기)  */}
            {isSearch.length !== 0 ? (
              <span className="selectTab">&nbsp;검색결과&nbsp;</span>
            ) : selectedMain === '1' ? (
              <span className="selectTab">
                &nbsp;{findCategoryTitle?.title}&nbsp;
              </span>
            ) : (
              <>
                <span
                  className={isLatest ? 'selectTab' : ''}
                  onClick={clickMenutab}
                >
                  &nbsp;최근&nbsp;
                </span>
                <span
                  className={isLatest ? '' : 'selectTab'}
                  onClick={clickMenutab}
                >
                  &nbsp;인기&nbsp;
                </span>
              </>
            )}
          </div>
          <div className={`articleListInner + ${!isLatest ? 'selectHot' : ''}`}>
            {articleList.length === 0 ? (
              <div className="noList">게시물이 없습니다.</div>
            ) : findCategoryTitle?.title === '개발뉴스' ? (
              <ArticleNews />
            ) : (
              articleList.map((article, i) => {
                return <ArticlePost key={i} article={article} />;
              })
            )}
          </div>
          <Paging setPage={setPage} page={page} />
          {/* <Pagination
            activePage={page}
            // itemsCountPerPage={10}
            totalItemsCount={100}
            pageRangeDisplayed={5}
            prevPageText="‹"
            nextPageText="›"
            onChange={handlePageChange}
          /> */}
        </div>
      </div>
    </div>
  );
}

export default ArticleList;

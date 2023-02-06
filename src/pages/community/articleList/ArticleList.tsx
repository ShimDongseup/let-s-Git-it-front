import React, { SetStateAction } from 'react';
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
  const [selectedHotDate, setSelectedHotDate] = useState('전체');
  const [hotSortList, setHotSortList] = useState<ArticleType[]>([]);

  // sort 분류기
  const comparator = (name: string): any => {
    return (prev: { [x: string]: number }, next: { [x: string]: number }) =>
      prev[name] === next[name] ? 0 : prev[name] > next[name] ? -1 : 1;
  };

  // 인기순 정렬
  const [isLatest, setIsLatest] = useState<boolean>(true);
  const today = new Date().getTime();
  const hotSortDate = (id: number) => {
    let hotDateList: ArticleType[] = [];
    hotSortList.forEach(el => {
      let postDate = new Date(el.postTime).getTime();
      let interval = Math.floor((today - postDate) / (1000 * 60 * 60 * 24));
      if (interval < id) {
        hotDateList.push(el);
      }
    });
    console.log(1);
    setArticleList(hotDateList);
  };
  const handleHotDate = (e: { target: { value: SetStateAction<string> } }) => {
    setSelectedHotDate(e.target.value);
    hotSortDate(Number(e.target.value));
  };

  // 최신순, 인기순 클릭
  const clickMenutab = () => {
    setIsLatest(!isLatest);
    if (isLatest) {
      const hotList = [...articleList];
      hotList.sort(comparator('recommendNum'));
      setArticleList(hotList);
      setHotSortList(hotList);
    } else {
      setArticleList(articleCopyList);
    }
  };

  // 인기순 초기화
  const intialization = () => {
    setSelectedHotDate('전체');
    setArticleList(hotSortList);
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
                  &nbsp;최신순&nbsp;
                </span>
                <span
                  className={isLatest ? '' : 'selectTab'}
                  onClick={clickMenutab}
                >
                  &nbsp;인기순&nbsp;
                </span>
                {!isLatest && (
                  <div>
                    <button className="initialHotBtn" onClick={intialization}>
                      <img src="./image/icon/return.png" alt="undo" />
                    </button>
                    <select
                      className="hotSelect"
                      value={selectedHotDate}
                      onChange={handleHotDate}
                    >
                      {HOT_DATE_LIST.map(
                        (date: { id: number; date: string }) => {
                          return (
                            <option value={date.id} key={date.id}>
                              {date.date}
                            </option>
                          );
                        }
                      )}
                    </select>
                  </div>
                )}
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

const HOT_DATE_LIST: { id: number; date: string }[] = [
  { id: 366, date: '전체' },
  { id: 1, date: '오늘' },
  { id: 7, date: '일주일' },
  { id: 30, date: '한달' },
  { id: 365, date: '일년' },
];

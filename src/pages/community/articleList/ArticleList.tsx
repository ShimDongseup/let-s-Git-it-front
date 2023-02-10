import React, { SetStateAction } from 'react';
import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import {
  articleSearchKeyword,
  articleSearchOption,
  categoryState,
} from '../../../atom';
import { useRecoilState, useRecoilValue } from 'recoil';
import Pagination from 'react-js-pagination';
import ArticleMenu from '../articleMenu/ArticleMenu';
import ArticlePost from './components/ArticlePost';
import ArticleNews from './components/ArticleNews';
import INFO_CATEGORY_LIST from '../articleMenu/InfoCategory';
import './articleList.scss';
import './components/paging.scss';

export type ArticleType = {
  postId: number;
  post_title: string;
  createdAt: string;
  userName: string;
  tierId: string;
  comment: number;
  postLike: number;
  subCategoryName: string;
  userId: number;
};

function ArticleList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [articleList, setArticleList] = useState<ArticleType[]>([]);
  const [articleCopyList, setArticleCopyList] = useState<ArticleType[]>([]);
  const [articleSearhList, setArticleSearhList] = useState<ArticleType[]>([]);
  const [selectedHotDate, setSelectedHotDate] = useState<string>('전체');
  const [hotSortList, setHotSortList] = useState<ArticleType[]>([]);

  const params = useParams();
  const categoryId = params.id;

  // localstorage
  // const active = localStorage.getItem('category');
  // recoil
  const [selectActive, setSelectActive] = useRecoilState(categoryState);
  const sOption = useRecoilValue(articleSearchOption);
  const sKeyword = useRecoilValue(articleSearchKeyword);

  // sort 분류기
  const comparator = (name: string): any => {
    return (prev: { [x: string]: number }, next: { [x: string]: number }) =>
      prev[name] === next[name] ? 0 : prev[name] > next[name] ? -1 : 1;
  };

  // 최신순, 인기순 클릭시 해당 리스트
  const [isLatest, setIsLatest] = useState<boolean>(true);
  const clickMenutab = () => {
    setIsLatest(!isLatest);
    if (isLatest) {
      const hotList = [...articleCopyList];
      hotList.sort(comparator('postLike'));
      setArticleList(hotList);
      setHotSortList(hotList);
    } else {
      setArticleList(articleCopyList);
    }
  };

  // 인기순 정렬(기간 변경 & 그에따른 리스트 변경)
  const handleHotDate = (e: { target: { value: SetStateAction<string> } }) => {
    handlePageChange(1);
    setSelectedHotDate(e.target.value);
    hotSortDate(Number(e.target.value));
  };
  const today = new Date().getTime();
  const hotSortDate = (id: number) => {
    let hotDateList: ArticleType[] = [];
    hotSortList.forEach(el => {
      let postDate = new Date(el.createdAt).getTime();
      let interval = Math.floor((today - postDate) / (1000 * 60 * 60 * 24));
      if (interval < id) {
        hotDateList.push(el);
      }
    });
    setArticleList(hotDateList);
  };

  const selectTab = document.querySelector('.selectTab')?.innerHTML;

  // 인기순 초기화
  const intialization = () => {
    setSelectedHotDate('전체');
    setArticleList(hotSortList);
  };

  const isSearch = searchParams.get('option');
  useEffect(() => {
    if (Number(categoryId) === 9) {
      searchParams.set('option', sOption.toString());
      searchParams.set('keyword', sKeyword.toString());
      setSearchParams(searchParams);
      fetch('../data/search.json')
        // fetch(`ip/search?option=${sOption}&keyword=${sKeyword}`)
        .then(res => res.json())
        .then(data => {
          setArticleSearhList(data);
        });
    }
  }, [sKeyword, sOption]);

  // 글검색 결과 fetch
  useEffect(() => {
    handlePageChange(1);
  }, [isSearch]);

  const removeParams = () => {
    if (isSearch) {
      searchParams.delete('option');
      searchParams.delete('keyword');
    }
    setSearchParams(searchParams);
  };

  // 카테고리별 fetch
  // const articleFetch = () => {
  //   removeParams();
  // if (categoryId !== undefined) {
  //   setSelectActive(Number(categoryId));
  // }
  //   fetch(`./data/post.json`)
  //     .then(res => res.json())
  //     .then(data => {
  //       handlePageChange(1);
  //       setArticleList(data);
  //       setArticleCopyList(data);
  //     });
  // };
  // useEffect(() => {
  //   setIsLatest(true);
  //   // articleFetch();
  //   handlePageChange(page);
  // }, [selectActive]);

  // const articleFetch = () => {
  //   // removeParams();
  //   if (categoryId !== undefined) {
  //     setSelectActive(Number(categoryId));
  //   }
  //   if (Number(categoryId) === 9) {
  //     setSelectActive(Number(categoryId));
  //   } else {
  //     fetch(`../data/post.json`)
  //       .then(res => res.json())
  //       .then(data => {
  //         setArticleList(data);
  //         setArticleCopyList(data);
  //       });
  //   }
  // };
  useEffect(() => {
    setIsLatest(true);
    // articleFetch();
  }, [selectActive]);

  // 서버통신
  const IP = 'http://10.58.52.235:3000/';
  const articleFetch = (selectActive: number) => {
    removeParams();
    fetch(
      `${IP}community/posts/list/${selectActive}?_limit=${limit}&_start=${offset}`
    )
      .then(res => res.json())
      .then(data => setArticleList(data));
  };
  useEffect(() => {
    setIsLatest(true);
    handlePageChange(1);
    articleFetch(selectActive);
    setArticleCopyList(articleList);
  }, [selectActive]);

  // pagination
  const [page, setPage] = useState<number>(1);
  const offset = searchParams.get('offset');
  const limit = searchParams.get('limit');
  const handlePageChange = (page: number) => {
    setPage(page);
    searchParams.set('offset', ((page - 1) * 10).toString());
    searchParams.set('limit', '10');
    setSearchParams(searchParams);
  };

  const findCategoryTitle = INFO_CATEGORY_LIST[0].subTitle.find(
    el => el.id === selectActive
  );

  return (
    <div className="community">
      <div className="articleInner">
        <ArticleMenu setArticleSearhList={setArticleSearhList} />
        <div className="articleList">
          {selectActive}
          <div className="articleListSort">
            {/* 검색결과 유 ? 검색결과 : (정보카테고리 ? 정보타이틀 : 최근/인기)  */}
            {searchParams.get('keyword') !== null ? (
              <span className="selectTab">&nbsp;검색결과&nbsp;</span>
            ) : selectActive < 4 ? (
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
                {/* 인기순 정렬 */}
                {!isLatest && (
                  <div>
                    <button className="initialHotBtn" onClick={intialization}>
                      <img src="../image/icon/return.png" alt="undo" />
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
            {/* list없음 ? noList : ( 개발뉴스 ? AriticleNews : (버그신고 ? 구글폼 : ArticlePost) ) */}
            {articleList.length === 0 ? (
              selectTab === '&nbsp;버그/신고&nbsp;' ? (
                <div className="noList">
                  <a href="https://docs.google.com/forms/d/e/1FAIpQLSfZpQa3ejxFe_r3dVTdDWVWWwJTzJ5HahMxVGSkb96FMtF77A/viewform?usp=sf_link">
                    버그신고 링크 바로가기
                  </a>
                </div>
              ) : (
                <div className="noList">게시물이 없습니다.</div>
              )
            ) : selectTab === '&nbsp;개발뉴스&nbsp;' ? (
              <ArticleNews />
            ) : selectTab === '&nbsp;검색결과&nbsp;' ? (
              articleSearhList.map((article, i) => {
                return <ArticlePost key={i} article={article} />;
              })
            ) : (
              articleList.map((article, i) => {
                return <ArticlePost key={i} article={article} />;
              })
            )}
          </div>
          <Pagination
            activePage={page}
            // itemsCountPerPage={10}
            totalItemsCount={100}
            pageRangeDisplayed={5}
            prevPageText="‹"
            nextPageText="›"
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default ArticleList;

const HOT_DATE_LIST: { id: number; date: string }[] = [
  { id: 1000, date: '전체' },
  { id: 1, date: '오늘' },
  { id: 7, date: '일주일' },
  { id: 30, date: '한달' },
  { id: 365, date: '일년' },
];

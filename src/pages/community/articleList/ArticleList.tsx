import React, { SetStateAction } from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import {
  articleSearchKeyword,
  articleSearchOption,
  categoryState,
  currentPage,
} from '../../../atom';
import { useRecoilState, useRecoilValue } from 'recoil';
import Pagination from 'react-js-pagination';
import ArticleMenu from '../articleMenu/ArticleMenu';
import ArticleNews from './components/ArticleNews';
import ArticlePost from './components/ArticlePost';
import './articleList.scss';
import './components/paging.scss';
import { BASE_URL } from '../../../config';

export type ArticleType = {
  postId: number;
  post_title: string;
  createdAt: string;
  userName: string;
  tierName: string;
  comment: number;
  postLike: number;
  subCategoryName: string;
  userId: number;
  title: string;
};

export type NewsType = {
  post_title: string;
  post_content: string;
  createdAt: string;
  imageUrl: string;
  newsUrl: string;
};

function ArticleList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [articleList, setArticleList] = useState<ArticleType[]>([]);
  const [totalList, setTotalList] = useState<number>(1);
  const search = useLocation();

  const currentSort = searchParams.get('sort');
  const currentDate = searchParams.get('date');
  const [selectedHotDate, setSelectedHotDate] = useState(currentDate);

  const params = useParams();
  const categoryId = Number(params.id);

  // // recoil
  const [selectActive, setSelectActive] = useRecoilState(categoryState);
  const [currentPageNumber, setCurrentPageNumber] = useRecoilState(currentPage);
  const sOption = useRecoilValue(articleSearchOption);
  const sKeyword = useRecoilValue(articleSearchKeyword);
  const offset = searchParams.get('offset');

  // 카테고리별 fetch
  const articleFetch = () => {
    axios
      .get(`${BASE_URL}/community/posts/list/${categoryId}${search.search}`)
      .then(res => {
        setArticleList(res.data.postLists);
        setTotalList(res.data.total);
      });
  };

  useEffect(() => {
    setSelectActive(categoryId);
    if (categoryId === 3) {
      searchParams.delete('option');
      searchParams.delete('keyword');
    } else if (categoryId === 9) {
      searchFetch();
    } else if (categoryId === 2) {
      getNews();
    } else if (categoryId !== 2) {
      articleFetch();
    }
  }, [categoryId]);
  // // 최신순, 인기순 클릭시 해당 리스트
  const clickMenutab = (click: boolean) => {
    if (click) {
      searchParams.set('sort', 'latest');
      searchParams.delete('date');
    } else {
      setSelectedHotDate('all');
      searchParams.set('sort', 'mostLiked');
      searchParams.set('date', 'all');
    }
    handlePageChange(1);
  };
  // 인기순 정렬(기간 변경 & 그에따른 리스트 변경)
  const handleHotDate = (e: { target: { value: SetStateAction<string> } }) => {
    setSelectedHotDate(e.target.value.toString());
    searchParams.set('date', e.target.value.toString());
    handlePageChange(1);
  };
  useEffect(() => {
    if (categoryId !== 9) {
      articleFetch();
    }
  }, [currentSort, currentDate]);
  // // 인기순 초기화
  const intialization = () => {
    clickMenutab(false);
  };

  const searchFetch = () => {
    handlePageChange(currentPageNumber);
    if (categoryId === 9) {
      axios.get(`${BASE_URL}/community/search${search.search}`).then(res => {
        setArticleList(res.data.postLists);
        setTotalList(res.data.total);
      });
    }
  };
  useEffect(() => {
    searchFetch();
  }, [sKeyword, sOption]);

  // pagination
  const handlePageChange = (currentPageNumber: number) => {
    setCurrentPageNumber(currentPageNumber);
    searchParams.set('limit', '10');
    searchParams.set('offset', ((currentPageNumber - 1) * 10).toString());
    setSearchParams(searchParams);
  };
  useEffect(() => {
    if (categoryId !== 9) {
      setCurrentPageNumber(Number(offset) / 10 + 1);
      articleFetch();
    } else {
      axios.get(`${BASE_URL}/community/search${search.search}`).then(res => {
        setArticleList(res.data.postLists);
        setTotalList(res.data.total);
      });
    }
  }, [offset]);

  const [newsList, setNewsList] = useState<NewsType[]>([]);
  const getNews = () => {
    axios.get('../data/news.json').then(res => {
      setNewsList(res.data.postLists);
      setTotalList(res.data.total);
    });
  };
  const findCategoryTitle = INFO_CATEGORY_LIST.find(
    el => el.id === selectActive
  );

  if (!articleList) return null;

  return (
    <div className="community">
      <div className="articleInner">
        <ArticleMenu />
        <div className="articleList">
          <div className="articleListSort">
            {/* 검색결과 유 ? 검색결과 : (정보카테고리 ? 정보타이틀 : 최근/인기)  */}
            {categoryId === 9 ? (
              <span className="selectTab">&nbsp;검색결과&nbsp;</span>
            ) : categoryId < 4 ? (
              <span className="selectTab">
                &nbsp;{findCategoryTitle?.title}&nbsp;
              </span>
            ) : (
              <>
                <span
                  className={currentSort === 'latest' ? 'selectTab' : ''}
                  onClick={() => clickMenutab(true)}
                >
                  &nbsp;최신순&nbsp;
                </span>
                <span
                  className={currentSort === 'latest' ? '' : 'selectTab'}
                  onClick={() => clickMenutab(false)}
                >
                  &nbsp;인기순&nbsp;
                </span>
                {/* 인기순 정렬 */}
                {currentSort !== 'latest' && (
                  <div>
                    <button className="initialHotBtn">
                      <img
                        src="../images/icon/return.png"
                        alt="undo"
                        onClick={intialization}
                      />
                    </button>
                    <select
                      className="hotSelect"
                      value={currentDate?.toString()}
                      onChange={handleHotDate}
                    >
                      {HOT_DATE_LIST.map(
                        (date: { id: string; date: string }) => {
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
          <div
            className={`articleListInner + ${
              currentSort !== 'latest' ? 'selectHot' : ''
            }`}
          >
            {categoryId !== 2 &&
              categoryId !== 3 &&
              articleList.length === 0 && (
                <div className="noList">게시물이 없습니다.</div>
              )}
            {categoryId === 3 ? (
              <div className="bugReportWrap">
                <div className="bugReport">
                  <a href="https://docs.google.com/forms/d/e/1FAIpQLSfZpQa3ejxFe_r3dVTdDWVWWwJTzJ5HahMxVGSkb96FMtF77A/viewform?usp=sf_link">
                    버그신고 링크 바로가기
                  </a>
                  <p>버그신고는 구글폼을 통해 요청해주시면 감사하겠습니다.</p>
                </div>
              </div>
            ) : categoryId === 2 ? (
              <ArticleNews newsList={newsList} />
            ) : (
              articleList.map((article, i) => {
                return <ArticlePost key={i} article={article} />;
              })
            )}
          </div>
          {categoryId !== 3 && totalList !== 0 && (
            <Pagination
              activePage={currentPageNumber}
              totalItemsCount={totalList}
              pageRangeDisplayed={5}
              prevPageText="‹"
              nextPageText="›"
              onChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ArticleList;

const HOT_DATE_LIST: { id: string; date: string }[] = [
  { id: 'all', date: '전체' },
  { id: 'day', date: '오늘' },
  { id: 'week', date: '일주일' },
  { id: 'month', date: '한달' },
  { id: 'year', date: '일년' },
];
const INFO_CATEGORY_LIST: { id: number; title: string }[] = [
  { id: 1, title: '공지사항' },
  { id: 2, title: '개발뉴스' },
  { id: 3, title: '버그신고' },
];

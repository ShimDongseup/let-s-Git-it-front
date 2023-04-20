import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BASE_URL } from '../../config';
import { Ranking } from '../../../@types/Rank';
import axios from 'axios';
import './rank.scss';

function Rank() {
  const [currentList, setCurrentList] = useState<Ranking[]>([]);
  const [rankLanguage, setRankLanguage] = useState<string[]>([]);
  const [selectLanguage, setSelectLanguage] = useState<string>('All');
  const [selectThead, setSelectThead] = useState<string>('');
  const [sortArrow, setSortArrow] = useState<boolean>(false);
  const [isShown, setIsShown] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName');

  // 최초 랭킹 불러오기
  const getRanking = () => {
    // axios.get(`/ranks/ranking/top100`).then(res => {
    axios.get(`${BASE_URL}/ranks/ranking/top100`).then(res => {
      setCurrentList(res.data.top100);
      setRankLanguage(res.data.langCategory.sort());
    });
  };
  useEffect(() => {
    try {
      getRanking();
    } catch (error) {
      console.log(error);
    }
  }, []);

  // 언어 선택 & 언어별 필터링
  const optionLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectLanguage(e.target.value);
  };
  const filteringLanguage = (url: string) => {
    axios.get(`${BASE_URL}/ranks/ranking/top100?${url}`).then(res => {
      setCurrentList(res.data.top100);
    });
  };

  useEffect(() => {
    searchParams.set('langFilter', selectLanguage);
    setSearchParams(searchParams);
    filteringLanguage(searchParams.toString());
  }, [selectLanguage]);

  // th 변화 감지
  const sortActive = (e: React.MouseEvent<HTMLTableCellElement>) => {
    setSelectThead(e.currentTarget.abbr);
    setSortArrow(!sortArrow);
  };
  useEffect(() => {
    sortRank(selectThead, sortArrow);
  }, [selectThead, sortArrow]);

  // 오름차순, 내림차순 정렬
  const sortRank = (key: string, sort = false) => {
    const sortList = [...currentList];
    const comparator = (name: string, sort: boolean): any => {
      if (!sort)
        return (
          prevRanker: { [x: string]: number },
          nextRanker: { [x: string]: number }
        ) =>
          prevRanker[name] === nextRanker[name]
            ? 0
            : prevRanker[name] < nextRanker[name]
            ? -1
            : 1;
      else {
        return (
          nextRanker: { [x: string]: number },
          prevRanker: { [x: string]: number }
        ) =>
          prevRanker[name] === nextRanker[name]
            ? 0
            : prevRanker[name] < nextRanker[name]
            ? -1
            : 1;
      }
    };
    sortList.sort(comparator(key, sort));
    setCurrentList(sortList);
  };

  // 선택 초기화
  const intialization = () => {
    setSortArrow(false);
    setSelectLanguage('All');
    getRanking();
  };

  // user 클릭시 이동
  const goToUser = (user: string) => {
    navigate(`/userDetail/${user}`);
  };

  return (
    <section id="rankWrap">
      <div className="rankInner">
        <div className="rankTitle">
          <h2>TOP 100</h2>
          <button className="initialRankBtn" onClick={intialization}>
            <img src="../images/icon/return.png" alt="undo" />
          </button>
          <select
            name="languageSelect"
            id="languageSelect"
            onChange={optionLanguage}
            value={selectLanguage}
          >
            <option value="All">전체</option>
            {rankLanguage.map((language, i) => {
              return (
                <option value={language} key={i}>
                  {language}
                </option>
              );
            })}
          </select>
        </div>
        <div className="rankContent">
          <table>
            <colgroup>
              <col width="90px;" />
              <col width="" />
              <col width="220px;" />
              <col width="130px;" />
              <col width="130px;" />
              <col width="140px" />
              <col width="130px" />
            </colgroup>
            <thead>
              <tr>
                <th>Rank</th>
                <th className="tableLeft nameTh">Username</th>
                <th>Main language</th>
                {TH_LIST.map(th => {
                  return (
                    <th
                      key={th.id}
                      className="sortTh"
                      onClick={e => sortActive(e)}
                      abbr={th.sortTitle}
                    >
                      {th.title}
                      <img
                        src="./image/arrow.png"
                        alt="arrow"
                        className={
                          'arrow ' +
                          (th.sortTitle === selectThead && sortArrow
                            ? 'rotate'
                            : '')
                        }
                      />
                    </th>
                  );
                })}
                <th>
                  Total
                  <img
                    src="./image/question.png"
                    alt="question"
                    className="totalInfo"
                    onMouseEnter={() => setIsShown(true)}
                    onMouseLeave={() => setIsShown(false)}
                  />
                  {isShown && (
                    <div className="hoverContent">
                      종합점수는 호기심(10%), 열정(20%), 명성(35%), 능력(35%)로
                      산출된 점수입니다.
                    </div>
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {currentList.map((ranker, i) => {
                return (
                  <tr
                    key={i}
                    className={ranker.rankerName === userName ? ' myRank' : ''}
                  >
                    <td>{i + 1}</td>
                    <td
                      className="tableLeft userDecoration"
                      onClick={() => goToUser(ranker.rankerName)}
                    >
                      <img
                        src={`./image/${ranker.tier}.png`}
                        alt="tier"
                        className="tier"
                      />
                      {ranker.rankerName}
                    </td>
                    <td>{ranker.mainLang}</td>
                    <td>{ranker.followerNumber}</td>
                    <td>{ranker.myStarNumber}</td>
                    <td>{ranker.commitNumber}</td>
                    <td>{Math.floor(Number(ranker.totalScore))}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default Rank;

const TH_LIST = [
  {
    id: 1,
    title: 'Followers',
    sortTitle: 'followerNumber',
  },
  {
    id: 2,
    title: 'Stars',
    sortTitle: 'myStarNumber',
  },
  {
    id: 3,
    title: 'Contribution',
    sortTitle: 'commitNumber',
  },
];

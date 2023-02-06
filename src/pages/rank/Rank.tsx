import React, { useEffect, useState } from 'react';
import TH_LIST from './thList';
import './rank.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';

function Rank() {
  type Rank = {
    userName: string;
    language: string;
    image: string;
    followers: number;
    stars: number;
    contribution: number;
    total: number;
  };
  const [rankList, setRankList] = useState<Rank[]>([]);
  const [currentList, setCurrentList] = useState<Rank[]>([]);
  const [selectLanguage, setSelectLanguage] = useState<string>('All');
  const [selectThead, setSelectThead] = useState<string>('');
  const [sortArrow, setSortArrow] = useState<boolean>(false);
  const [isShown, setIsShown] = useState<boolean>(false);
  const [rankLanguage, setRankLanguage] = useState<string[]>([]);
  const RANK_LANGUAGE = ['All', 'javascript', 'java', 'python', 'typescript'];
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const IP = 'url';

  // 최초 랭킹 불러오기
  const getRanking = () => {
    // fetch(`${IP}/ranks/tops?language=All`);
    fetch('./data/rankList.json')
      .then(res => res.json())
      .then(data => {
        setRankList(data);
        setCurrentList(data);
      });
  };
  useEffect(() => {
    getRanking();
  }, []);

  // 선택 초기화
  const intialization = () => {
    setSelectLanguage('All');
    setCurrentList(rankList);
  };

  // 언어 불러오기
  const getLanguage = () => {
    fetch('./lang')
      .then(res => res.json())
      .then(data => setRankLanguage(data));
  };
  // 언어 선택 & 언어별 필터링
  const optionLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectLanguage(e.target.value);
  };
  const filtering = (url: string) => {
    fetch(`${IP}/tops${url}`)
      .then(response => response.json())
      .then(data => setCurrentList(data));
  };
  useEffect(() => {
    searchParams.set('language', selectLanguage);
    setSearchParams(searchParams);
    filtering(searchParams.toString());
  }, [selectLanguage]);

  // const filterLanguage = () => {
  //   if (selectLanguage !== 'All') {
  //     const filterResult = rankList.filter(
  //       rank => rank.language === selectLanguage
  //     );
  //     setCurrentList(filterResult);
  //   } else {
  //     setCurrentList(rankList);
  //   }
  //   setSortArrow(false);
  // };

  // th 변화 감지
  const sortActive = (e: React.MouseEvent<HTMLTableCellElement>) => {
    setSelectThead((e.target as HTMLElement).innerText);
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

  // user 클릭시 이동
  const goToUser = (user: string) => {
    navigate(`/userDetail/${user}`);
  };

  return (
    <div className="rankWrap">
      <div className="rankInner">
        <div className="rankTitle">
          <h2>TOP 100</h2>
          <button className="initialRankBtn" onClick={intialization}>
            <img src="./image/icon/return.png" alt="undo" />
          </button>
          <select
            name="languageSelect"
            id="languageSelect"
            onChange={optionLanguage}
            value={selectLanguage}
          >
            {/* RANK_LANGUAGE 대신 rankLanguage 값 불러오기 */}
            {RANK_LANGUAGE.map((language, i) => {
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
              <col width="200px" />
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
                <th className="tableLeft">User name</th>
                <th />
                <th>Main language</th>
                {TH_LIST.map(th => {
                  return (
                    <th
                      key={th.id}
                      className="sortTh"
                      onClick={e => sortActive(e)}
                    >
                      {th.title}
                      <img
                        src="./image/icon/arrow.png"
                        alt="arrow"
                        className={
                          'arrow ' +
                          (th.title === selectThead && sortArrow
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
                    src="./image/icon/question.png"
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
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td
                      className="tableLeft userDecoration"
                      onClick={() => goToUser(ranker.userName)}
                    >
                      <img src={ranker.image} alt="tier" className="tier" />
                      {ranker.userName}
                    </td>
                    <td />
                    <td>{ranker.language}</td>
                    <td>{ranker.followers}</td>
                    <td>{ranker.stars}</td>
                    <td>{ranker.contribution}</td>
                    <td>{ranker.total}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Rank;

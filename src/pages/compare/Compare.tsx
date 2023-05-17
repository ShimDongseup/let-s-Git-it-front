import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

import RadarGraph from '../../components/graphs/compareGraph/CompareRadarGraph';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Profile from '../../components/profile/Profile';
import BarGraph from '../../components/graphs/compareGraph/CompareBarGraph';
import { searchResults } from '../../../@types/Search';
import './Compare.scss';
import { BASE_URL } from '../../config';

function Compare({ size }: any) {
  type User = {
    rankerDetail: {
      rankerId: string;
      rankerName: string;
      personalRepoNumber: number;
      company: string;
      region: string;
      blog: string;
      email: string;
      profileImage: string;
      followingNumber: number;
      followerNumber: number;
      myStarNumber: number;
      mainLang: string;
      curiosityScore: string;
      passionScore: string;
      fameScore: string;
      abilityScore: string;
      tier: string;
      totalScore: string;
    };
  };

  type Compare = {
    firstUser: {
      rankerDetail: {
        rankerId: string;
        rankerName: string;
        curiosityScore: string;
        passionScore: string;
        fameScore: string;
        abilityScore: string;
      };
    };
    secondUser: {
      rankerDetail: {
        rankerId: string;
        rankerName: string;
        curiosityScore: string;
        passionScore: string;
        fameScore: string;
        abilityScore: string;
      };
    };
  };

  const [userOne, setUserOne] = useState<User[]>([]);
  const [userTwo, setUserTwo] = useState<User[]>([]);
  const [compareStickGraph, setCompareStickGraph] = useState<Compare[]>([]);
  const [compareRadarGraph, setCompareRadarGraph] = useState<Compare[]>([]);
  const [userName, setUserName] = useState<string>();
  const [userNameSecond, setUserNameSecond] = useState<string>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isView, setIsView] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [container, setContainer] = useState(false);
  const [search, setSearch] = useState<string>('');
  const [secondSearch, setSecondSearch] = useState<string>('');
  const [results, setResults] = useState<searchResults[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isSecondSearchOpen, setIsSecondSearchOpen] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [explain, setExplain] = useState(false);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/ranks/versus?${searchParams.toString()}`)
      .then(result => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        setUserOne([result.data.firstUser]);
        setUserTwo([result.data.secondUser]);
        setCompareRadarGraph([result.data]);
        setCompareStickGraph([result.data]);
        setIsLoading(false);
        setContainer(true);
      })
      .catch(error => {
        if (
          error.response.data.message === 'Request failed with status code 502'
        ) {
          alert('유저 이름을 확인해주세요!');
        }
      });
    setIsView(true);
    const clickOutside = (e: any): void => {
      if (!searchRef.current?.contains(e.target)) {
        setIsSearchOpen(false);
        setIsSecondSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', clickOutside);
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, [searchParams, searchRef]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
    axios
      .get(`${BASE_URL}/ranks/search?userName=${e.target.value}`)
      .then(res => {
        setResults(res.data);
      });
  };
  const handleSecondInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSecondSearch(e.target.value);
    axios
      .get(`${BASE_URL}/ranks/search?userName=${e.target.value}`)
      .then(res => {
        setResults(res.data);
      });
  };

  const appendSortParams = () => {
    setIsLoading(true);
    searchParams.set('userName', `${userName}`);
    searchParams.append('userName', `${userNameSecond}`);
    setSearchParams(searchParams);
    window.location.reload();
  };
  const userNameOne = (e: any) => {
    setUserName(e.target.value);
  };
  const userNameTwo = (e: any) => {
    setUserNameSecond(e.target.value);
  };

  return (
    <>
      <div>{isLoading ? <LoadingSpinner isLoading={isLoading} /> : null}</div>
      <div className="compareOutline">
        <div className="comparSerarch">
          <div className={`search ${size}`}>
            <input
              autoComplete="off"
              value={search}
              name="usernametwo"
              placeholder="유저 검색"
              onChange={e => {
                userNameOne(e);
                handleInput(e);
              }}
              onClick={() => setIsSearchOpen(true)}
              className="searchUser"
              type="search"
            />
            {search && isSearchOpen && (
              <div className={`resultWrap ${size}`} ref={searchRef}>
                검색결과
                {results.length ? (
                  <div className="resultList">
                    {results.map((data, el: number) => {
                      return (
                        <div
                          className={`resultInfo ${size}`}
                          key={el}
                          onClick={() => {
                            setSearch(`${data.rankerName}`);
                            setUserName(`${data.rankerName}`);
                            setIsSearchOpen(false);
                          }}
                        >
                          <img
                            className={`img ${size}`}
                            src={data.profileImage}
                            alt="profile Img"
                          />
                          <div className="tier">{data.tierImage}</div>
                          <div>{data.rankerName}</div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className={`errorMsg ${size}`}>
                    알맞은 유저가 없습니다.
                  </div>
                )}
              </div>
            )}
          </div>
          <button className="compareSearchButton" onClick={appendSortParams}>
            <p>VS</p>
          </button>
          <div className={`search ${size}`}>
            <input
              autoComplete="off"
              value={secondSearch}
              name="usernametwo"
              placeholder="유저 검색"
              onChange={e => {
                userNameTwo(e);
                handleSecondInput(e);
              }}
              onClick={() => setIsSecondSearchOpen(true)}
              className="searchUser"
              type="search"
            />
            {secondSearch && isSecondSearchOpen && (
              <div className={`resultWrap ${size}`} ref={searchRef}>
                검색결과
                {results.length ? (
                  <div className="resultList">
                    {results.map((data, el: number) => {
                      return (
                        <div
                          className={`resultInfo ${size}`}
                          key={el}
                          onClick={() => {
                            setSecondSearch(`${data.rankerName}`);
                            setUserNameSecond(`${data.rankerName}`);
                            setIsSecondSearchOpen(false);
                          }}
                        >
                          <img
                            className={`img ${size}`}
                            src={data.profileImage}
                            alt="profile Img"
                          />
                          <div className="tier">{data.tierImage}</div>
                          <div>{data.rankerName}</div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className={`errorMsg ${size}`}>
                    알맞은 유저가 없습니다
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        {window.screen.width > 480 ? (
          <div className="compareBox">
            {container ? (
              <div className="secondProfileCard">
                <Profile user={userOne} />
              </div>
            ) : (
              <div className="firstProfileCard">
                <Profile user={userOne} />
              </div>
            )}

            {isView && (
              <div className="graphBox">
                <div className="reqGraph">
                  <RadarGraph compareRadarGraph={compareRadarGraph} />
                </div>
                <div
                  className="graphInfoBox"
                  onClick={() => {
                    setExplain(true);
                  }}
                >
                  <img
                    src="../image/question.png"
                    className="graphInfoImg"
                    alt="그래프 구성"
                  />
                </div>
                <div className="stickGraph">
                  {explain && (
                    <div
                      className="graphInfoexplain"
                      onClick={() => {
                        setExplain(false);
                      }}
                    >
                      <p>
                        <p className="gtitle">호기심</p>: 이슈 수, 포크한 수,
                        누른 스타 수, 팔로잉 수
                      </p>
                      <p>
                        <p className="gtitle">열정</p>: 커밋 수, 풀 리퀘스트 수,
                        리뷰 수, 레포지토리 수
                      </p>
                      <p>
                        <p className="gtitle">명성</p>: 팔로워 수, 포크된 수,
                        방문자 수
                      </p>
                      <p>
                        <p className="gtitle">능력</p>: 스폰서 수, 기여한
                        레포지토리 스타 수, 받은 스타 수
                      </p>
                      <div className="closingButton">
                        <div className="closingButtonText">
                          <div>닫기</div>
                        </div>
                      </div>
                    </div>
                  )}
                  {!explain && (
                    <BarGraph compareStickGraph={compareStickGraph} />
                  )}
                </div>
              </div>
            )}
            {container ? (
              <div className="secondProfileCard">
                <Profile user={userTwo} />
              </div>
            ) : (
              <div className="firstProfileCard">
                <Profile user={userTwo} />
              </div>
            )}
          </div>
        ) : (
          <div className="compareBox">
            <div className="compareBoxInnerProfile">
              {container ? (
                <div className="secondProfileCard">
                  <Profile user={userOne} />
                </div>
              ) : (
                <div className="firstProfileCard">
                  <Profile user={userOne} />
                </div>
              )}
              {container ? (
                <div className="secondProfileCard">
                  <Profile user={userTwo} />
                </div>
              ) : (
                <div className="firstProfileCard">
                  <Profile user={userTwo} />
                </div>
              )}
            </div>
            {isView && (
              <div className="graphBox">
                <div className="reqGraph">
                  <RadarGraph compareRadarGraph={compareRadarGraph} />
                </div>
                <div
                  className="graphInfoBox"
                  onClick={() => {
                    setExplain(true);
                  }}
                >
                  <img
                    src="../image/question.png"
                    className="graphInfoImg"
                    alt="그래프 구성"
                  />
                </div>
                <div className="stickGraph">
                  {explain && (
                    <div
                      className="graphInfoexplain"
                      onClick={() => {
                        setExplain(false);
                      }}
                    >
                      <p>
                        <p className="gtitle">호기심</p>: 이슈 수, 포크한 수,
                        누른 스타 수, 팔로잉 수
                      </p>
                      <p>
                        <p className="gtitle">열정</p>: 커밋 수, 풀 리퀘스트 수,
                        리뷰 수, 레포지토리 수
                      </p>
                      <p>
                        <p className="gtitle">명성</p>: 팔로워 수, 포크된 수,
                        방문자 수
                      </p>
                      <p>
                        <p className="gtitle">능력</p>: 스폰서 수, 기여한
                        레포지토리 스타 수, 받은 스타 수
                      </p>
                      <div className="closingButton">
                        <div className="closingButtonText">
                          <div>닫기</div>
                        </div>
                      </div>
                    </div>
                  )}
                  {!explain && (
                    <BarGraph compareStickGraph={compareStickGraph} />
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Compare;

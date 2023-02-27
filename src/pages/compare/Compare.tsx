import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import RadarGraph from '../../components/graphs/compareGraph/CompareRadarGraph';
import CompareBarGraph from '../../components/graphs/userDetailGraph/userDetailInnerGraph';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Profile from '../../components/profile/Profile';
import { BASE_URL } from '../../config';
import './Compare.scss';
import BarGraph from '../../components/graphs/compareGraph/CompareBarGraph';

function Compare() {
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

  type Stick = {
    rankerDetail: {
      issueNumber: number;
      forkingNumber: number;
      starringNumber: number;
      followingNumber: number;
      commitNumber: number;
      prNumber: number;
      reviewNumber: number;
      personalRepoNumber: number;
      followerNumber: number;
      forkedNumber: number;
      r_fame_repository_watched_number: number;
      sponsorNumber: number;
      contributingRepoStarNumber: number;
      myStarNumber: number;
    };
  };
  const [stickGraph, setStickGraph] = useState<Stick[]>([]);
  const [userOne, setUserOne] = useState<User[]>([]);
  const [userTwo, setUserTwo] = useState<User[]>([]);
  const [compareStickGraph, setCompareStickGraph] = useState<Compare[]>([]);
  const [compareRadarGraph, setCompareRadarGraph] = useState<Compare[]>([]);
  const [userName, setUserName] = useState();
  const [userNameSecond, setUserNameSecond] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isView, setIsView] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [container, setContainer] = useState(false);

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
  }, [searchParams]);

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
          <input
            name="usernameone"
            placeholder="유저 검색"
            onChange={userNameOne}
            className="searchUser"
          />
          <button className="compareSearchButton" onClick={appendSortParams}>
            검색
          </button>
          <input
            name="usernametwo"
            placeholder="유저 검색"
            onChange={userNameTwo}
            className="searchUser"
          />
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
                <div className="stickGraph">
                  <BarGraph compareStickGraph={compareStickGraph} />
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
                <div className="stickGraph">
                  <BarGraph compareStickGraph={compareStickGraph} />
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

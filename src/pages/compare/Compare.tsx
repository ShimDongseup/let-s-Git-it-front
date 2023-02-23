import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import RadarGraph from '../../components/graphs/compareGraph/CompareRadarGraph';
import CompareBarGraph from '../../components/graphs/userDetailGraph/userDetailInnerGraph';
import Profile from '../../components/profile/Profile';
import { BASE_URL } from '../../config';
import './Compare.scss';
import BarGraph from './CompareBarGraph';

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
    };
  };

  type Compare = {
    firstUser: {
      rankerDetail: {
        rankerName: string;
        curiosityScore: string;
        passionScore: string;
        fameScore: string;
        abilityScore: string;
      };
    };
    secondUser: {
      rankerDetail: {
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

  const appendSortParams = () => {
    searchParams.set('userName', `${userName}`);
    searchParams.append('userName', `${userNameSecond}`);
    setSearchParams(searchParams);
    axios
      .get(`${BASE_URL}/ranks/versus?${searchParams.toString()}`)
      .then(result => {
        console.log(result);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        setUserOne([result.data.firstUser]);
        setUserTwo([result.data.secondUser]);
        setCompareRadarGraph([result.data]);
        setCompareStickGraph([result.data]);
      });
    setIsView(true);
  };
  const userNameOne = (e: any) => {
    setUserName(e.target.value);
  };
  const userNameTwo = (e: any) => {
    setUserNameSecond(e.target.value);
  };
  const Arr: any = [];

  // const Arr: any = [];
  // useEffect(() => {
  //   fetch('./data/userInfo.json')
  //     .then(response => response.json())
  //     .then(result => {
  //       Arr.push(result);
  //       // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  //       setUser(Arr), setRadarGraph(Arr), setStickGraph(Arr);
  //     });
  // }, []);
  return (
    <div className="compareOutline">
      <div className="comparSerarch">
        <input
          name="usernameone"
          placeholder="유저이름 검색"
          onChange={userNameOne}
        />
        <button className="compareSearchButton" onClick={appendSortParams}>
          검색
        </button>
        <input
          name="usernametwo"
          placeholder="유저이름 검색"
          onChange={userNameTwo}
        />
      </div>
      <div className="compareBox">
        <div className="firstProfileCard">
          <Profile user={userOne} />
        </div>
        {/* {isView && ( */}
        <div className="graphBox">
          <div className="reqGraph">
            <RadarGraph compareRadarGraph={compareRadarGraph} />
          </div>
          <div className="stickGraph">
            <BarGraph compareStickGraph={compareStickGraph} />
          </div>
        </div>
        {/* )} */}
        <div className="firstProfileCard">
          <Profile user={userTwo} />
        </div>
      </div>
    </div>
  );
}

export default Compare;

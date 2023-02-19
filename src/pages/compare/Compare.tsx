import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import RadarGraph from '../../components/graphs/compareGraph/CompareRadarGraph';
import CompareBarGraph from '../../components/graphs/userDetailGraph/userDetailInnerGraph';
import Profile from '../../components/profile/Profile';
import { BASE_URL } from '../../config';
import './Compare.scss';
import BarGraph from './CompareBarGraph';
import ProfileOne from './CompareProfile';
import ProfileTwo from './CompareProfileTwo';

function Compare() {
  type UserOne = {
    firstUser: {
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
  };
  type UserTwo = {
    secondUser: {
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
  };

  type CompareRadar = {
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

  type CompareStick = {
    firstUser: {
      rankerDetail: {
        rankerName: string;
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
        watchedNumber: number;
        sponsorNumber: number;
        contributingRepoStarNumber: number;
        myStarNumber: number;
      };
    };
    secondUser: {
      rankerDetail: {
        rankerName: string;
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
        watchedNumber: number;
        sponsorNumber: number;
        contributingRepoStarNumber: number;
        myStarNumber: number;
      };
    };
    graphName: {
      curiosity: string;
      passion: string;
      fame: string;
      ability: string;
    };
    legendName: {
      issueNumber: string;
      forkingNumber: string;
      starringNumber: string;
      followingNumber: any | null;
      commitNumber: string;
      prNumber: string;
      reviewNumber: string;
      personalRepoNumber: string;
      followerNumber: string;
      forkedNumber: string;
      watchedNumber: string;
      sponsorNumber: string;
      contributingRepoStarNumber: string;
      myStarNumber: string;
      blank: string;
    };
  };

  const [userOne, setUserOne] = useState<UserOne[]>([]);
  const [userTwo, setUserTwo] = useState<UserTwo[]>([]);
  const [compareStickGraph, setCompareStickGraph] = useState<CompareStick[]>(
    []
  );
  const [compareRadarGraph, setCompareRadarGraph] = useState<CompareRadar[]>(
    []
  );
  const [userName, setUserName] = useState();
  const [mount, setMount] = useState(false);
  const [userNameSecond, setUserNameSecond] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const graphName = {
    curiosity: '호기심',
    passion: '열정',
    fame: '명성',
    ability: '능력',
  };

  const legendName = {
    issueNumber: '이슈 수',
    forkingNumber: '포크한 수',
    starringNumber: '누른 스타 수',
    followingNumber: '팔로잉 수',
    commitNumber: '커밋 수',
    prNumber: '풀 리퀘스트 수',
    reviewNumber: '리뷰 수',
    personalRepoNumber: '레포지토리 수',
    followerNumber: '팔로워 수',
    forkedNumber: '포크된 수',
    watchedNumber: '방문자 수',
    sponsorNumber: '스폰서 수',
    contributingRepoStarNumber: '기여한 레포지토리 스타 수',
    myStarNumber: '받은 스타 수',
    blank: '',
  };
  const appendSortParams = () => {
    searchParams.set('userName', `${userName}`);
    searchParams.append('userName', `${userNameSecond}`);
    setSearchParams(searchParams);
    fetch(`${BASE_URL}/ranks/versus?${searchParams.toString()}`)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        // Arr.push(result);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions

        setUserOne([result]);
        setUserTwo([result]);
        setCompareRadarGraph([result]);
        setCompareStickGraph([result, legendName, graphName]);
      });
  };

  const userNameOne = (e: any) => {
    setUserName(e.target.value);
  };
  const userNameTwo = (e: any) => {
    setUserNameSecond(e.target.value);
  };
  useEffect(() => {
    setMount(true);
  }, []);
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
    <>
      <div className="comparSerarch">
        <input name="usernameone" onChange={userNameOne} />
        <button onClick={appendSortParams}>검색</button>
        <input name="usernametwo" onChange={userNameTwo} />
      </div>
      <div className="compareBox">
        <div className="firstProfileCard">
          <ProfileOne user={userOne} />
          <ProfileTwo user={userTwo} />
        </div>
        <div className="graphBox">
          <div className="reqGraph">
            <RadarGraph compareRadarGraph={compareRadarGraph} />
          </div>
          {/* {mount && compareStickGraph && (
            <div className="stickGraph">
              <BarGraph compareStickGraph={compareStickGraph} />
            </div>
          )} */}
        </div>
      </div>
    </>
  );
}

export default Compare;

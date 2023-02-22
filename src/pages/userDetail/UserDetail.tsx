import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import RadarGraph from '../../components/graphs/userDetailGraph/UserDetailRadarGraph';
import StickGraph from '../../components/graphs/userDetailGraph/UserDetailStickGraph';
import Profile from '../../components/profile/Profile';
import GitHubCalendar from 'react-github-calendar';
import ReactTooltip from 'react-tooltip';
import './UserDetail.scss';
import { BASE_URL } from '../../config';
import axios from 'axios';

function UserDetail() {
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

  type UserRadar = {
    rankerDetail: {
      RankerProfile_name: string;
      curiosityScore: string;
      passionScore: string;
      fameScore: string;
      abilityScore: string;
    };
  };

  type UserStick = {
    rankerDetail: {
      issueNumber: number;
      forkingNumber: number;
      starringNumber: number;
      followingNumber: number | null;
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
      tierImage: null;
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

  const [user, setUser] = useState<User[]>([]);
  const [stickGraph, setStickGraph] = useState<UserStick[]>([]);
  const [radarGraph, setRadarGraph] = useState<UserRadar[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const navigate = useNavigate();
  const params = useParams();
  const userName = params.userName;
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
  // useEffect(() => {
  //   fetch('./data/userInfo.json')
  //     .then(response => response.json())
  //     .then(result => {
  //       Arr.push(result);
  //       // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  //       setUser(Arr), setRadarGraph(Arr), setStickGraph(Arr);
  //     });
  // }, []);
  useEffect(() => {
    axios
      .get(`${BASE_URL}/ranks/${userName}`)
      .then(result => {
        console.log(result.data);
        setUser([result.data]);
        setRadarGraph([result.data]);
        setStickGraph([
          { rankerDetail: result.data.rankerDetail, graphName, legendName },
        ]);
      })
      .catch(error => {
        console.log(error);
        if (error.response.data.message === 'GITHUB API IS OVERLOADED') {
          alert('존재하지 않는 사용자입니다.');
          navigate('/');
        }
      });
  }, [userName]);

  console.log(stickGraph);

  return (
    <div className="infoBox">
      <Profile user={user} />
      <div className="userInfoGraph">
        <div className="radarGraph">
          <RadarGraph radarGraph={radarGraph} />
          {isMounted && userName && (
            <div className="grassCalendar">
              <GitHubCalendar username={userName} showWeekdayLabels>
                <ReactTooltip html />
              </GitHubCalendar>
            </div>
          )}
        </div>
        <StickGraph stickGraph={stickGraph} />
      </div>
    </div>
  );
}

export default UserDetail;

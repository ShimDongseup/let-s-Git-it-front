import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import RadarGraph from '../../components/graphs/radarGraph/UserDetailRadarGraph';
import StickGraph from '../../components/graphs/stickGraph/UserDetailStickGraph';
import Profile from '../../components/profile/Profile';
import './UserDetail.scss';

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

  type Radar = {
    rankerDetail: {
      RankerProfile_name: string;
      curiosityScore: string;
      passionScore: string;
      fameScore: string;
      abilityScore: string;
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
      watchedNumber: number;
      sponsorNumber: number;
      contributingRepoStarNumber: number;
      myStarNumber: number;
    };
  };

  const [graph, setGraph] = useState(false);
  const [user, setUser] = useState<User[]>([]);
  const [stickGraph, setStickGraph] = useState<Stick[]>([]);
  const [radarGraph, setRadarGraph] = useState<Radar[]>([]);
  const params = useParams();
  const userName = params.userName;
  const Arr: any = [];
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
    fetch(`http://10.58.52.142:3000/ranks/${userName}`)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        Arr.push(result);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        setUser(Arr), setRadarGraph(Arr), setStickGraph(Arr);
      });
  }, []);

  return (
    <div
      className="infoBox"
      onClick={() => {
        setGraph(true);
      }}
    >
      <Profile user={user} />
      <div className="userInfoGraph">
        <div className="radarGraph">
          <RadarGraph radarGraph={radarGraph} />
        </div>
        <StickGraph stickGraph={stickGraph} />
      </div>
    </div>
  );
}

export default UserDetail;

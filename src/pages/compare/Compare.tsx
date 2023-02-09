import React, { useEffect, useState } from 'react';
import RadarGraph from '../../components/graphs/radarGraph/CompareRadarGraph';
import CompareBarGraph from '../../components/graphs/stickGraph/BarGraph';
import Profile from '../../components/profile/Profile';
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
      r_fame_repository_watched_number: number;
      sponsorNumber: number;
      contributingRepoStarNumber: number;
      myStarNumber: number;
    };
  };
  const [user, setUser] = useState<User[]>([]);
  const [stickGraph, setStickGraph] = useState<Stick[]>([]);
  const [radarGraph, setRadarGraph] = useState<Radar[]>([]);

  const Arr: any = [];
  useEffect(() => {
    fetch('./data/userInfo.json')
      .then(response => response.json())
      .then(result => {
        Arr.push(result);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        setUser(Arr), setRadarGraph(Arr), setStickGraph(Arr);
      });
  }, []);
  return (
    <>
      <div className="comparSerarch">
        <input></input>
        <button>검색</button>
        <input></input>
      </div>
      <div className="compareBox">
        <div className="firstProfileCard">
          <Profile user={user} />
        </div>
        <div className="graphBox">
          <div className="reqGraph">
            <RadarGraph user={user} />
          </div>
          <div className="stickGraph">
            <BarGraph stickGraph={stickGraph} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Compare;

import React, { useEffect, useState } from 'react';
import RadarGraph from '../../components/graphs/radarGraph/CompareRadarGraph';
import CompareBarGraph from '../../components/graphs/stickGraph/BarGraph';
import Profile from '../../components/profile/Profile';
import './Compare.scss';
import BarGraph from './CompareBarGraph';

function Compare() {
  type Rank = {
    id: string;
    userName: string;
    repo: string;
    follow: string;
    following: string;
    company: string;
    location: string;
    blog: string;
    mail: string;
    language: string;
    image: string;
    followers: number;
    stars: number;
    contribution: number;
    total: number;
  };
  const [user, setUser] = useState<Rank[]>([]);

  useEffect(() => {
    fetch('./data/userInfo.json')
      .then(response => response.json())
      .then(result => setUser(result));
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
            <BarGraph />
          </div>
        </div>
      </div>
    </>
  );
}

export default Compare;

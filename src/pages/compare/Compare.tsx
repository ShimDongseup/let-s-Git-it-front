import React, { useEffect, useState } from 'react';
import RadarGraph from '../../components/graphs/radarGraph/RadarGraph';
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
    stars: string;
    blog: string;
    mail: string;
  };
  const [user, setUser] = useState<Rank[]>([]);

  useEffect(() => {
    fetch('./data/userInfo.json')
      .then(response => response.json())
      .then(result => setUser(result));
  }, []);
  return (
    <div className="compareBox">
      <div className="firstProfileCard">
        <Profile user={user} />
      </div>
      <div>
        <div className="reqGraph">
          <RadarGraph />
        </div>
        <div className="stickGraph">
          <BarGraph />
        </div>
      </div>
      <div className="secondProfileCard">
        <Profile user={user} />
      </div>
    </div>
  );
}

export default Compare;

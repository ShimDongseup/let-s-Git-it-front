import React, { useEffect, useState } from 'react';
import RadarGraph from '../../components/graphs/radarGraph/RadarGraph';
import StickGraph from '../../components/graphs/stickGraph/StickGraph';
import Profile from '../../components/profile/Profile';
import './UserDetail.scss';

function UserDetail() {
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

  const [graph, setGraph] = useState(false);
  const [user, setUser] = useState<Rank[]>([]);

  useEffect(() => {
    fetch('./data/userInfo.json')
      .then(response => response.json())
      .then(result => setUser(result));
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
          <RadarGraph user={user} />
        </div>
        <StickGraph user={user} />
      </div>
    </div>
  );
}

export default UserDetail;

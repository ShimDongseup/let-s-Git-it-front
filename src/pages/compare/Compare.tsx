import React, { useEffect, useState } from 'react';
import Profile from '../../components/profile/Profile';
import './Compare.scss';

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
    fetch('../data/userInfo.json')
      .then(response => response.json())
      .then(result => setUser(result));
  }, []);
  return (
    <div className="compareBox">
      <div className="firstProfileCard">
        <Profile user={user} />
      </div>
      <div>
        <div className="reqGraph">graph</div>
        <div className="stickGraph">stickgraph</div>
      </div>
      <div className="secondProfileCard">
        <Profile user={user} />
      </div>
    </div>
  );
}

export default Compare;

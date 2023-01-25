import React, { useEffect, useState } from 'react';
import MyResponsiveRadar from '../../components/graphs/Graph';
import StickGraph from '../../components/graphs/stickGraph/StickGraph';
import Profile from '../../components/profile/Profile';
import './UserDetail.scss';

function UserDetail() {
  const [user, setUser] = useState();

  useEffect(() => {
    fetch('./data/userInfo.json')
      .then(response => response.json())
      .then(result => setUser(result.user));
  }, []);

  return (
    <div className="infoBox">
      <Profile />
      <div className="userInfoGraph">
        <div className="radarGraph">레이더그래프</div>
        <StickGraph />
      </div>
    </div>
  );
}

export default UserDetail;

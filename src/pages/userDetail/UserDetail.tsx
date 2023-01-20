import React from 'react';
import Profile from '../../components/profile/Profile';
import './UserDetail.scss';

function UserDetail() {
  return (
    <div className="infoBox">
      <Profile />
      <div className="userInfoGraph">
        <div className="radarGraph">radar graph</div>
        <div className="stickGraph">
          <div>change tab</div>
          <div>stickGraph</div>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;

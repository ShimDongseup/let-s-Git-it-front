import React from 'react';
import Profile from '../../components/profile/Profile';
import './Compare.scss';

function Compare() {
  return (
    <div className="compareBox">
      <div className="firstProfileCard">
        <Profile />
      </div>
      <div>
        <div className="reqGraph">graph</div>
        <div className="stickGraph">stickgraph</div>
      </div>
      <div className="secondProfileCard">
        <Profile />
      </div>
    </div>
  );
}

export default Compare;

import React from 'react';
import Profile from '../../components/profile/Profile';
import './Compare.scss';
import BarGraph from './MyBar';
import RadarGraph from './MyChart';

function Compare() {
  return (
    <div className="compareBox">
      <div className="firstProfileCard">
        <Profile />
      </div>
      <div className="centerBox">
        <div className="reqGraph">
          <RadarGraph />
        </div>
        <div className="stickGraph">
          <BarGraph />
        </div>
      </div>
      <div className="secondProfileCard">
        <Profile />
      </div>
    </div>
  );
}

export default Compare;

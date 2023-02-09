import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import RadarGraph from '../../components/graphs/radarGraph/UserDetailRadarGraph';
import StickGraph from '../../components/graphs/stickGraph/UserDetailStickGraph';
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
  const params = useParams();
  const userName = params.userName;

  useEffect(() => {
    fetch('./data/userInfo.json')
      .then(response => response.json())
      .then(result => setUser(result));
  }, []);

  //   fetch(`http://localhost:3000/ranks/${userName}`, {
  //   method: 'POST',
  //   headers: {
  //       'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     userName:${userName}
  //   })
  // })
  // .then(response => response.json())
  // .then(user => setUser(user));

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

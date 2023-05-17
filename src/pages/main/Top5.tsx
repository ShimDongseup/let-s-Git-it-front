import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Top5Rank } from '../../../@types/Rank';
import { BASE_URL } from '../../config';
import './Top5.scss';

function Top5() {
  const [top5, setTop5] = useState<Top5Rank[]>([]);

  // load top5 ranking
  useEffect(() => {
    axios.get(`/ranks/ranking/top5`).then(res => setTop5(res.data));
  }, []);

  return (
    <main className="cardWrap">
      <Link className="card top1" to={`/userDetail/${top5[0]?.rankerName}`}>
        <strong className="rank">1</strong>
        <h2 className="name">{top5[0]?.rankerName}</h2>
        <img
          className="img"
          src={top5[0]?.profileImage}
          alt="this is profile img"
        />
        <div className="score">{top5[0]?.totalScore}</div>
      </Link>
      <Link className="card top2" to={`/userDetail/${top5[1]?.rankerName}`}>
        <strong className="rank">2</strong>
        <h2 className="name">{top5[1]?.rankerName}</h2>
        <img
          className="img"
          src={top5[1]?.profileImage}
          alt="this is profile img"
        />
        <div className="score">{top5[1]?.totalScore}</div>
      </Link>
      <Link className="card top3" to={`/userDetail/${top5[2]?.rankerName}`}>
        <strong className="rank">3</strong>
        <h2 className="name">{top5[2]?.rankerName}</h2>
        <img
          className="img"
          src={top5[2]?.profileImage}
          alt="this is profile img"
        />
        <div className="score">{top5[2]?.totalScore}</div>
      </Link>
      <Link className="card top4" to={`/userDetail/${top5[3]?.rankerName}`}>
        <strong className="rank">4</strong>
        <h2 className="name">{top5[3]?.rankerName}</h2>
        <img
          className="img"
          src={top5[3]?.profileImage}
          alt="this is profile img"
        />
        <div className="score">{top5[3]?.totalScore}</div>
      </Link>
      <Link className="card top5" to={`/userDetail/${top5[4]?.rankerName}`}>
        <strong className="rank">5</strong>
        <h2 className="name">{top5[4]?.rankerName}</h2>
        <img
          className="img"
          src={top5[4]?.profileImage}
          alt="this is profile img"
        />
        <div className="score">{top5[4]?.totalScore}</div>
      </Link>
    </main>
  );
}

export default Top5;

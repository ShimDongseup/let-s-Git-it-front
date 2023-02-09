import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Top5.scss';

function Top5() {
  const [top5Ranking, setTop5Ranking] = useState([]);

  useEffect(() => {
    axios
      .get('/ranks/ranking/top5')
      .then(res => setTop5Ranking(res.data))
      .catch();
  }, []);

  return (
    <main className="cardWrap">
      <Link className="card top1" to="/userDetail/1">
        <strong className="rank">1</strong>
        <h2 className="name">kimboyoon0908</h2>
        <img
          className="img"
          src="https://cdn.pixabay.com/photo/2018/05/13/16/57/dog-3397110__480.jpg"
          alt="this is profile img"
        />
        <div className="score">500</div>
      </Link>
      <Link className="card top2" to="/userDetail/2">
        <strong className="rank">2</strong>
        <h2 className="name">kimboyoon0908</h2>
        <img
          className="img"
          src="https://cdn.pixabay.com/photo/2018/05/13/16/57/dog-3397110__480.jpg"
          alt="this is profile img"
        />
        <div className="score">500</div>
      </Link>
      <Link className="card top3" to="/userDetail/3">
        <strong className="rank">3</strong>
        <h2 className="name">kby0908</h2>
        <img
          className="img"
          src="https://cdn.pixabay.com/photo/2018/05/13/16/57/dog-3397110__480.jpg"
          alt="this is profile img"
        />
        <div className="score">500</div>
      </Link>
      <Link className="card top4" to="/userDetail/4">
        <strong className="rank">4</strong>
        <h2 className="name">kby0908</h2>
        <img
          className="img"
          src="https://cdn.pixabay.com/photo/2018/05/13/16/57/dog-3397110__480.jpg"
          alt="this is profile img"
        />
        <div className="score">500</div>
      </Link>
      <Link className="card top5" to="/userDetail/5">
        <strong className="rank">5</strong>
        <h2 className="name">kby0908</h2>
        <img
          className="img"
          src="https://cdn.pixabay.com/photo/2018/05/13/16/57/dog-3397110__480.jpg"
          alt="this is profile img"
        />
        <div className="score">500</div>
      </Link>
    </main>
  );
}

export default Top5;

const TOP5_DATAS = [
  {
    rankerName: 'hwookim',
    profileImage: 'https://avatars.githubusercontent.com/u/45786387?v=4',
    totalScore: '3053',
  },
  {
    rankerName: 'SangYoonLee1231',
    profileImage: 'https://avatars.githubusercontent.com/u/47064130?v=4',
    totalScore: '2769',
  },
  {
    rankerName: 'bigfanoftim',
    profileImage: 'https://avatars.githubusercontent.com/u/62135254?v=4',
    totalScore: '1146',
  },
  {
    rankerName: 'Gyelanjjim',
    profileImage: 'https://avatars.githubusercontent.com/u/108852943?v=4',
    totalScore: '220',
  },
  {
    rankerName: 'MatheGoD',
    profileImage: 'https://avatars.githubusercontent.com/u/110371295?v=4',
    totalScore: '171',
  },
];

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Top5.scss';

function Top5() {
  type Rank = {
    userName: string;
    profileImg: string;
    score: number;
  };

  const [top5, setTop5] = useState<Rank[]>([]);

  // load top5 ranking
  useEffect(() => {
    axios.get('/main/ranks').then(res => setTop5(res.data));
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

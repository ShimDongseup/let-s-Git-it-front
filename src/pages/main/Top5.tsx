import React from 'react';
import { Link } from 'react-router-dom';
import './Top5.scss';

function Top5() {
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
    rank: 1,
    name: 'aaa',
    profileImg:
      'https://www.shutterstock.com/image-photo/happy-puppy-dog-smiling-on-260nw-1799966587.jpg',
    score: 900,
  },
  {
    rank: 2,
    name: 'bbb',
    profileImg:
      'https://www.shutterstock.com/image-photo/happy-puppy-dog-smiling-on-260nw-1799966587.jpg',
    score: 850,
  },
  {
    rank: 3,
    name: 'ccc',
    profileImg:
      'https://www.shutterstock.com/image-photo/happy-puppy-dog-smiling-on-260nw-1799966587.jpg',
    score: 700,
  },
  {
    rank: 4,
    name: 'ddd',
    profileImg:
      'https://www.shutterstock.com/image-photo/happy-puppy-dog-smiling-on-260nw-1799966587.jpg',
    score: 500,
  },
  {
    rank: 5,
    name: 'eee',
    profileImg:
      'https://www.shutterstock.com/image-photo/happy-puppy-dog-smiling-on-260nw-1799966587.jpg',
    score: 350,
  },
];

import React from 'react';
import './Top5.scss';

function Top5() {
  return (
    <main className="cardWrap">
      {TOP5_DATAS.map(data => {
        return (
          <section className="card" key={data.rank}>
            <strong className="rank">{data.rank}</strong>
            <img
              className="img"
              src={data.profileImg}
              alt="this is profile img"
            />
            <div className="score">{data.score}</div>
          </section>
        );
      })}
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

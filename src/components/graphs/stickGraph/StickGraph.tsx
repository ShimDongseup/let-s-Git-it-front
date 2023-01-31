import React, { useState } from 'react';
import CompareBarGraph from './BarGraph';
import BarGraph from './BarGraph';
import './StickGraph.scss';
// eslint-disable-next-line @typescript-eslint/no-redeclare
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
interface Props {
  // setUser: React.Dispatch<React.SetStateAction<Rank[]>>;
  user: Rank[];
}

function StickGraph(props: Props) {
  // eslint-disable-next-line react/destructuring-assignment
  const copyList = [...props.user];
  const [curiosity, setCuriosity] = useState(true);
  const [passion, setPassion] = useState(false);
  const [fame, setFame] = useState(false);
  const [ability, setAbility] = useState(false);
  return (
    <div className="stickGraph">
      <div className="stickGraphInnerBox">
        <div className="stickGraphButton">
          {curiosity ? (
            <button
              className="buttonTrue"
              onClick={() => {
                setCuriosity(true);
                setPassion(false);
                setFame(false);
                setAbility(false);
              }}
            >
              호기심
            </button>
          ) : (
            <button
              onClick={() => {
                setCuriosity(true);
                setPassion(false);
                setFame(false);
                setAbility(false);
              }}
            >
              호기심
            </button>
          )}
          {passion ? (
            <button
              className="buttonTrue"
              onClick={() => {
                setPassion(true);
                setCuriosity(false);
                setFame(false);
                setAbility(false);
              }}
            >
              열정
            </button>
          ) : (
            <button
              onClick={() => {
                setPassion(true);
                setCuriosity(false);
                setFame(false);
                setAbility(false);
              }}
            >
              열정
            </button>
          )}
          {fame ? (
            <button
              className="buttonTrue"
              onClick={() => {
                setFame(true);
                setCuriosity(false);
                setPassion(false);
                setAbility(false);
              }}
            >
              명성
            </button>
          ) : (
            <button
              onClick={() => {
                setFame(true);
                setCuriosity(false);
                setPassion(false);
                setAbility(false);
              }}
            >
              명성
            </button>
          )}
          {ability ? (
            <button
              className="buttonTrue"
              onClick={() => {
                setAbility(true);
                setCuriosity(false);
                setPassion(false);
                setFame(false);
              }}
            >
              능력
            </button>
          ) : (
            <button
              onClick={() => {
                setAbility(true);
                setCuriosity(false);
                setPassion(false);
                setFame(false);
              }}
            >
              능력
            </button>
          )}
        </div>
        <div>
          {curiosity && (
            <div>
              <CompareBarGraph user={copyList} />
            </div>
          )}
          {passion && (
            <div>
              (커밋,피알,피알리뷰,레포수)
              <CompareBarGraph user={copyList} />
            </div>
          )}
          {fame && (
            <div>
              (팔로워수,레포 포크당한수, 레포 워치당한수)
              <CompareBarGraph user={copyList} />
            </div>
          )}
          {ability && (
            <div>
              (스폰받은수,레포스타수,기여한 저장소 스타수,공동작업에 참여한
              스타수)
              <CompareBarGraph user={copyList} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StickGraph;

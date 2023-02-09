import React, { useState } from 'react';
import CompareBarGraph from './BarGraph';
import BarGraph from './BarGraph';
import './UserDetailStickGraph.scss';
// eslint-disable-next-line @typescript-eslint/no-redeclare

type Stick = {
  rankerDetail: {
    issueNumber: number;
    forkingNumber: number;
    starringNumber: number;
    followingNumber: number;
    commitNumber: number;
    prNumber: number;
    reviewNumber: number;
    personalRepoNumber: number;
    followerNumber: number;
    forkedNumber: number;
    watchedNumber: number;
    sponsorNumber: number;
    contributingRepoStarNumber: number;
    myStarNumber: number;
  };
};
interface Props {
  // setUser: React.Dispatch<React.SetStateAction<Rank[]>>;
  stickGraph: Stick[];
}

function StickGraph(props: Props) {
  // eslint-disable-next-line react/destructuring-assignment
  const stick = [...props.stickGraph];
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
        <div className="stickGraphData">
          {curiosity && (
            <div>
              <CompareBarGraph stickGraph={stick} />
            </div>
          )}
          {passion && (
            <div>
              <CompareBarGraph stickGraph={stick} />
            </div>
          )}
          {fame && (
            <div>
              <CompareBarGraph stickGraph={stick} />
            </div>
          )}
          {ability && (
            <div>
              <CompareBarGraph stickGraph={stick} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StickGraph;

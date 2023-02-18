import React, { useState } from 'react';
import CompareBarGraph from './CompareBarGraph';
import BarGraph from './CompareBarGraph';
// import PassionBarGraph from './PassionBarGraph';
import './UserDetailStickGraph.scss';
// eslint-disable-next-line @typescript-eslint/no-redeclare

type Stick = {
  rankerDetail: {
    issueNumber: number;
    forkingNumber: number;
    starringNumber: number;
    followingNumber: number | null;
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
    blank: null;
  };
  graphName: {
    curiosity: string;
    passion: string;
    fame: string;
    ability: string;
  };
  legendName: {
    issueNumber: string;
    forkingNumber: string;
    starringNumber: string;
    followingNumber: any | null;
    commitNumber: string;
    prNumber: string;
    reviewNumber: string;
    personalRepoNumber: string;
    followerNumber: string;
    forkedNumber: string;
    watchedNumber: string;
    sponsorNumber: string;
    contributingRepoStarNumber: string;
    myStarNumber: string;
    blank: string;
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
              <CompareBarGraph
                stickGraph={stick.map(s => ({
                  ...s,
                  rankerDetail: {
                    issueNumber: s.rankerDetail.issueNumber,
                    forkingNumber: s.rankerDetail.forkingNumber,
                    starringNumber: s.rankerDetail.starringNumber,
                    followingNumber: s.rankerDetail.followingNumber,
                    commitNumber: s.rankerDetail.commitNumber,
                    prNumber: s.rankerDetail.prNumber,
                    reviewNumber: s.rankerDetail.reviewNumber,
                    personalRepoNumber: s.rankerDetail.personalRepoNumber,
                    followerNumber: s.rankerDetail.followerNumber,
                    forkedNumber: s.rankerDetail.forkedNumber,
                    watchedNumber: s.rankerDetail.watchedNumber,
                    sponsorNumber: s.rankerDetail.sponsorNumber,
                    contributingRepoStarNumber:
                      s.rankerDetail.contributingRepoStarNumber,
                    myStarNumber: s.rankerDetail.myStarNumber,
                    blank: s.rankerDetail.blank,
                  },
                  graphName: {
                    curiosity: s.graphName.curiosity,
                    passion: s.graphName.passion,
                    fame: s.graphName.fame,
                    ability: s.graphName.ability,
                  },
                  legendName: {
                    issueNumber: s.legendName.issueNumber,
                    forkingNumber: s.legendName.forkingNumber,
                    starringNumber: s.legendName.starringNumber,
                    followingNumber: s.legendName.followingNumber,
                    commitNumber: s.legendName.commitNumber,
                    prNumber: s.legendName.prNumber,
                    reviewNumber: s.legendName.reviewNumber,
                    personalRepoNumber: s.legendName.personalRepoNumber,
                    followerNumber: s.legendName.followerNumber,
                    forkedNumber: s.legendName.forkedNumber,
                    watchedNumber: s.legendName.watchedNumber,
                    sponsorNumber: s.legendName.sponsorNumber,
                    contributingRepoStarNumber:
                      s.legendName.contributingRepoStarNumber,
                    myStarNumber: s.legendName.myStarNumber,
                    blank: s.legendName.blank,
                  },
                }))}
              />
            </div>
          )}
          {passion && (
            <div>
              <CompareBarGraph
                stickGraph={stick.map(s => ({
                  ...s,
                  rankerDetail: {
                    issueNumber: s.rankerDetail.commitNumber,
                    forkingNumber: s.rankerDetail.prNumber,
                    starringNumber: s.rankerDetail.reviewNumber,
                    followingNumber: s.rankerDetail.personalRepoNumber,
                    commitNumber: s.rankerDetail.commitNumber,
                    prNumber: s.rankerDetail.prNumber,
                    reviewNumber: s.rankerDetail.reviewNumber,
                    personalRepoNumber: s.rankerDetail.personalRepoNumber,
                    followerNumber: s.rankerDetail.followerNumber,
                    forkedNumber: s.rankerDetail.forkedNumber,
                    watchedNumber: s.rankerDetail.watchedNumber,
                    sponsorNumber: s.rankerDetail.sponsorNumber,
                    contributingRepoStarNumber:
                      s.rankerDetail.contributingRepoStarNumber,
                    myStarNumber: s.rankerDetail.myStarNumber,
                    blank: s.rankerDetail.blank,
                  },
                  graphName: {
                    curiosity: s.graphName.passion,
                    passion: s.graphName.passion,
                    fame: s.graphName.fame,
                    ability: s.graphName.ability,
                  },
                  legendName: {
                    issueNumber: s.legendName.commitNumber,
                    forkingNumber: s.legendName.prNumber,
                    starringNumber: s.legendName.reviewNumber,
                    followingNumber: s.legendName.personalRepoNumber,
                    commitNumber: s.legendName.commitNumber,
                    prNumber: s.legendName.prNumber,
                    reviewNumber: s.legendName.reviewNumber,
                    personalRepoNumber: s.legendName.personalRepoNumber,
                    followerNumber: s.legendName.followerNumber,
                    forkedNumber: s.legendName.forkedNumber,
                    watchedNumber: s.legendName.watchedNumber,
                    sponsorNumber: s.legendName.sponsorNumber,
                    contributingRepoStarNumber:
                      s.legendName.contributingRepoStarNumber,
                    myStarNumber: s.legendName.myStarNumber,
                    blank: s.legendName.blank,
                  },
                }))}
              />
            </div>
          )}
          {fame && (
            <div>
              <CompareBarGraph
                stickGraph={stick.map(s => ({
                  ...s,
                  rankerDetail: {
                    issueNumber: s.rankerDetail.followerNumber,
                    forkingNumber: s.rankerDetail.forkedNumber,
                    starringNumber: s.rankerDetail.watchedNumber,
                    followingNumber: s.rankerDetail.blank,
                    commitNumber: s.rankerDetail.commitNumber,
                    prNumber: s.rankerDetail.prNumber,
                    reviewNumber: s.rankerDetail.reviewNumber,
                    personalRepoNumber: s.rankerDetail.personalRepoNumber,
                    followerNumber: s.rankerDetail.followerNumber,
                    forkedNumber: s.rankerDetail.forkedNumber,
                    watchedNumber: s.rankerDetail.watchedNumber,
                    sponsorNumber: s.rankerDetail.sponsorNumber,
                    contributingRepoStarNumber:
                      s.rankerDetail.contributingRepoStarNumber,
                    myStarNumber: s.rankerDetail.myStarNumber,
                    blank: s.rankerDetail.blank,
                  },
                  graphName: {
                    curiosity: s.graphName.fame,
                    passion: s.graphName.passion,
                    fame: s.graphName.fame,
                    ability: s.graphName.ability,
                  },
                  legendName: {
                    issueNumber: s.legendName.followerNumber,
                    forkingNumber: s.legendName.forkedNumber,
                    starringNumber: s.legendName.watchedNumber,
                    followingNumber: s.legendName.blank,
                    commitNumber: s.legendName.commitNumber,
                    prNumber: s.legendName.prNumber,
                    reviewNumber: s.legendName.reviewNumber,
                    personalRepoNumber: s.legendName.personalRepoNumber,
                    followerNumber: s.legendName.followerNumber,
                    forkedNumber: s.legendName.forkedNumber,
                    watchedNumber: s.legendName.watchedNumber,
                    sponsorNumber: s.legendName.sponsorNumber,
                    contributingRepoStarNumber:
                      s.legendName.contributingRepoStarNumber,
                    myStarNumber: s.legendName.myStarNumber,
                    blank: s.legendName.blank,
                  },
                }))}
              />
            </div>
          )}
          {ability && (
            <div>
              <CompareBarGraph
                stickGraph={stick.map(s => ({
                  ...s,
                  rankerDetail: {
                    issueNumber: s.rankerDetail.commitNumber,
                    forkingNumber: s.rankerDetail.prNumber,
                    starringNumber: s.rankerDetail.reviewNumber,
                    followingNumber: s.rankerDetail.blank,
                    commitNumber: s.rankerDetail.commitNumber,
                    prNumber: s.rankerDetail.prNumber,
                    reviewNumber: s.rankerDetail.reviewNumber,
                    personalRepoNumber: s.rankerDetail.personalRepoNumber,
                    followerNumber: s.rankerDetail.followerNumber,
                    forkedNumber: s.rankerDetail.forkedNumber,
                    watchedNumber: s.rankerDetail.watchedNumber,
                    sponsorNumber: s.rankerDetail.sponsorNumber,
                    contributingRepoStarNumber:
                      s.rankerDetail.contributingRepoStarNumber,
                    myStarNumber: s.rankerDetail.myStarNumber,
                    blank: s.rankerDetail.blank,
                  },
                  graphName: {
                    curiosity: s.graphName.ability,
                    passion: s.graphName.passion,
                    fame: s.graphName.fame,
                    ability: s.graphName.ability,
                  },
                  legendName: {
                    issueNumber: s.legendName.sponsorNumber,
                    forkingNumber: s.legendName.contributingRepoStarNumber,
                    starringNumber: s.legendName.myStarNumber,
                    followingNumber: s.legendName.blank,
                    commitNumber: s.legendName.commitNumber,
                    prNumber: s.legendName.prNumber,
                    reviewNumber: s.legendName.reviewNumber,
                    personalRepoNumber: s.legendName.personalRepoNumber,
                    followerNumber: s.legendName.followerNumber,
                    forkedNumber: s.legendName.forkedNumber,
                    watchedNumber: s.legendName.watchedNumber,
                    sponsorNumber: s.legendName.sponsorNumber,
                    contributingRepoStarNumber:
                      s.legendName.contributingRepoStarNumber,
                    myStarNumber: s.legendName.myStarNumber,
                    blank: s.legendName.blank,
                  },
                }))}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StickGraph;

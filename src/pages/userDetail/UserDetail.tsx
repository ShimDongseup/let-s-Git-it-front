import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import ReactTooltip from 'react-tooltip';
import RadarGraph from '../../components/graphs/userDetailGraph/UserDetailRadarGraph';
import StickGraph from '../../components/graphs/userDetailGraph/UserDetailStickGraph';
import Profile from '../../components/profile/Profile';
import GitHubCalendar from 'react-github-calendar';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { BsFillPeopleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import './UserDetail.scss';

function UserDetail() {
  type User = {
    rankerDetail: {
      rankerId: string;
      rankerName: string;
      personalRepoNumber: number;
      company: string;
      region: string;
      blog: string;
      email: string;
      profileImage: string;
      followingNumber: number;
      followerNumber: number;
      myStarNumber: number;
      mainLang: string;
      curiosityScore: string;
      passionScore: string;
      fameScore: string;
      abilityScore: string;
      tier: string;
      totalScore: string;
    };
  };

  type UserRadar = {
    rankerDetail: {
      rankerId: string;
      RankerProfile_name: string;
      curiosityScore: string;
      passionScore: string;
      fameScore: string;
      abilityScore: string;
    };
  };

  type UserStick = {
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
      tierImage: null;
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

  const [user, setUser] = useState<User[]>([]);
  const [stickGraph, setStickGraph] = useState<UserStick[]>([]);
  const [radarGraph, setRadarGraph] = useState<UserRadar[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const userName = params.userName;
  const graphName = {
    curiosity: '호기심',
    passion: '열정',
    fame: '명성',
    ability: '능력',
  };

  const legendName = {
    issueNumber: '이슈 수',
    forkingNumber: '포크한 수',
    starringNumber: '누른 스타 수',
    followingNumber: '팔로잉 수',
    commitNumber: '커밋 수',
    prNumber: '풀 리퀘스트 수',
    reviewNumber: '리뷰 수',
    personalRepoNumber: '레포지토리 수',
    followerNumber: '팔로워 수',
    forkedNumber: '포크된 수',
    watchedNumber: '방문자 수',
    sponsorNumber: '스폰서 수',
    contributingRepoStarNumber: '기여한 레포지토리 스타 수',
    myStarNumber: '받은 스타 수',
    blank: '없음',
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/ranks/${userName}`)
      .then(result => {
        if (
          result.data === '' ||
          result.data.rankerDetail.totalScore === null
        ) {
          alert('비공개 유저입니다');
          navigate('/');
        }
        if (result.data.rankerDetail.totalScore === '0.0000') {
          alert('정보가 없는 유저입니다.');
          navigate('/');
        }
        console.log(result.data);
        setUser([result.data]);
        setRadarGraph([result.data]);
        setStickGraph([
          { rankerDetail: result.data.rankerDetail, graphName, legendName },
        ]);
        setIsLoading(false);
      })
      .catch(error => {
        if (error.response.data.statusCode === 404) {
          alert('존재하지 않는 사용자입니다.');
          navigate('/');
        }
        if (error.response.data.message === 'GITHUB API IS OVERLOADED') {
          alert('잠시후 다시 시도해주세요!');
          navigate('/');
        }
      });
  }, [userName]);

  useEffect(() => {
    axios
      .get(`https://github-contributions-api.jogruber.de/v4/${userName}?y=last`)
      .then(result => {
        if (result.data === 404) {
          setIsMounted(false);
        } else {
          setIsMounted(true);
        }
      });
  }, []);

  const recall = () => {
    setIsLoading(true);
    axios.patch(`/ranks/latest/${userName}`).then(result => {
      setIsLoading(false);
      window.location.reload();
    });
  };

  return (
    <>
      <div>{isLoading ? <LoadingSpinner isLoading={isLoading} /> : null}</div>
      <div className="infoBox">
        <div className="infoProfile">
          <Profile user={user} />
          {localStorage.getItem('userName') && (
            <Link
              to={`/compare?userName=${userName}&userName=${localStorage.getItem(
                'userName'
              )}`}
              className="compareMe"
            >
              <BsFillPeopleFill className="compareMeIcon" />
              나와 비교하기
            </Link>
          )}
        </div>
        <div className="userInfoGraph">
          <div className="radarGraph">
            <div className="racallButtonBox">
              <div>
                <button className="graphversion">티어</button>
                <button className="graphversion">개인</button>
              </div>
              {user.map(({ rankerDetail }) => {
                return (
                  <button className="recallButton" key={1} onClick={recall}>
                    {rankerDetail.abilityScore}
                    <br />
                    {/* 갱신 시간으로 변경예정 */}
                    갱신하기
                  </button>
                );
              })}
            </div>
            <RadarGraph radarGraph={radarGraph} />
            {user.map(({ rankerDetail }) => {
              return (
                <div className="showScore" key={2}>
                  <div className="showScoreText">
                    <p>호기심</p>
                    <p>{rankerDetail.curiosityScore}</p>
                  </div>
                  <div className="showScoreText">
                    <p>열정</p>
                    <p>{rankerDetail.passionScore}</p>
                  </div>
                  <div className="showScoreText">
                    <p>명성</p>
                    <p>{rankerDetail.fameScore}</p>
                  </div>
                  <div className="showScoreText">
                    <p>능력</p>
                    <p>{rankerDetail.abilityScore}</p>
                  </div>
                </div>
              );
            })}

            {isMounted && userName && (
              <div className="grassCalendar">
                <GitHubCalendar
                  username={userName}
                  transformTotalCount={false}
                  hideTotalCount={false}
                  showWeekdayLabels
                >
                  <ReactTooltip html className="tooltip" />
                </GitHubCalendar>
              </div>
            )}
          </div>
          <StickGraph stickGraph={stickGraph} />
        </div>
      </div>
    </>
  );
}

export default UserDetail;

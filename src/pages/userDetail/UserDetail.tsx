import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import ReactTooltip from 'react-tooltip';
import { BASE_URL } from '../../config';
import RadarGraph from '../../components/graphs/userDetailGraph/UserDetailRadarGraph';
import StickGraph from '../../components/graphs/userDetailGraph/UserDetailStickGraph';
import Profile from '../../components/profile/Profile';
import GitHubCalendar from 'react-github-calendar';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { BsFillPeopleFill } from 'react-icons/bs';
import './UserDetail.scss';
import { Link } from 'react-router-dom';

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
    curiosity: '?????????',
    passion: '??????',
    fame: '??????',
    ability: '??????',
  };

  const legendName = {
    issueNumber: '?????? ???',
    forkingNumber: '????????? ???',
    starringNumber: '?????? ?????? ???',
    followingNumber: '????????? ???',
    commitNumber: '?????? ???',
    prNumber: '??? ???????????? ???',
    reviewNumber: '?????? ???',
    personalRepoNumber: '??????????????? ???',
    followerNumber: '????????? ???',
    forkedNumber: '????????? ???',
    watchedNumber: '????????? ???',
    sponsorNumber: '????????? ???',
    contributingRepoStarNumber: '????????? ??????????????? ?????? ???',
    myStarNumber: '?????? ?????? ???',
    blank: '',
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${BASE_URL}/ranks/${userName}`)
      .then(result => {
        if (result.data === '') {
          alert('????????? ???????????????');
          navigate('/');
        }
        console.log(result.data.rankerDetail.totalScore);
        if (result.data.rankerDetail.totalScore === '0.0000' || null) {
          alert('????????? ?????? ???????????????.');
          navigate('/');
        }
        setUser([result.data]);
        setRadarGraph([result.data]);
        setStickGraph([
          { rankerDetail: result.data.rankerDetail, graphName, legendName },
        ]);
        setIsLoading(false);
      })
      .catch(error => {
        if (error.response.data.statusCode === 404) {
          alert('???????????? ?????? ??????????????????.');
          navigate('/');
        }
        if (error.response.data.message === 'GITHUB API IS OVERLOADED') {
          alert('????????? ?????? ??????????????????!');
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
    axios.patch(`${BASE_URL}/ranks/latest/${userName}`).then(result => {
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
              ?????? ????????????
            </Link>
          )}
        </div>
        <div className="userInfoGraph">
          <div className="radarGraph">
            <div className="racallButtonBox">
              <button className="recallButton" onClick={recall}>
                ?????? ??????
              </button>
            </div>

            <RadarGraph radarGraph={radarGraph} />
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

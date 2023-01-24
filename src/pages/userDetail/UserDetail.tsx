import React, { useEffect, useState } from 'react';
import MyResponsiveRadar from '../../components/graphs/Graph';
import Profile from '../../components/profile/Profile';
import './UserDetail.scss';

function UserDetail() {
  const [curiosity, setCuriosity] = useState(true);
  const [passion, setPassion] = useState(false);
  const [fame, setFame] = useState(false);
  const [ability, setAbility] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    fetch('./data/userInfo.json')
      .then(response => response.json())
      .then(result => setUser(result.user));
  }, []);

  return (
    <div className="infoBox">
      <Profile />
      <div className="userInfoGraph">
        <div className="radarGraph">레이더그래프</div>
        <div className="stickGraph">
          <div className="stickGraphInnerBox">
            <div className="stickGraphButton">
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
            </div>
            <div>
              {curiosity && (
                <div>(이슈수, 포크한 레포,스타누른레포,팔로우)</div>
              )}
              {passion && <div>(커밋,피알,피알리뷰,레포수)</div>}
              {fame && <div>(팔로워수,레포 포크당한수, 레포 워치당한수)</div>}
              {ability && (
                <div>
                  (스폰받은수,레포스타수,기여한 저장소 스타수,공동작업에 참여한
                  스타수)
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;

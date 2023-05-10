import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { accessToken } from '../../atom';
import Login from '../../pages/login/Login';
import Search from '../search/Search';
import './Nav.scss';
import axios from 'axios';
import { BASE_URL } from '../../config';
function Nav() {
  const [token, setAccessToken] = useRecoilState(accessToken);
  const [activeLogin, setActivelogin] = useState(false);
  const handleLogin = (): void => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_REST_API_KEY}&redirect_uri=https://let-s-git-it.vercel.app/githublogin`;
    localStorage.setItem('referrer', window.location.href);
  };
  const openLogin = (): void => {
    setActivelogin(true);
  };
  // alert(`accessToken=${token}`);
  const logOut = (): void => {
    axios
      .get(`/auth/sign-out`)
      .then(res => {
        if (res.status !== 200) {
          alert('로그아웃에 실패하였습니다.');
        } else {
          alert('로그아웃 되었습니다.');
          setAccessToken('');
          localStorage.removeItem('userName');
          window.location.reload();
        }
      })
      .catch(err => console.log(err));
  };
  const activeStyle = {
    borderBottom: '1px solid #122e94',
    color: '#122e94',
    fontWeight: 'bold',
  };

  useEffect(() => {
    axios
      .get(`/auth/refresh`)
      .then(res => {
        console.log(res);
        if (res.status !== 200) {
          alert('Token재발급에 실패하였습니다.');
        } else {
          setAccessToken(res.data.accessToken);
        }
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <header className="allNav">
      <nav className="subNav">
        {token !== '' ? (
          <section className="subTabWrap">
            <NavLink
              className="subTab"
              to="/mypage"
              style={({ isActive }) => (isActive ? activeStyle : {})}
            >
              마이페이지
            </NavLink>
            <div>|</div>
            <div className="logOut" onClick={logOut}>
              로그아웃
            </div>
          </section>
        ) : (
          <section className="subTabWrap">
            <div
              className="logOut"
              onClick={window.screen.width > 480 ? openLogin : handleLogin}
            >
              로그인
            </div>
            <Login active={activeLogin} setActiveLogin={setActivelogin} />
          </section>
        )}
      </nav>
      <section className="mainNavWrap">
        <nav className="mainNav">
          <nav className="navTab">
            <Link className="logo" to="/">
              let's <span className="logoGit">GIT</span> it
            </Link>
            {NAV_TAB_DATAS.map(data => {
              return (
                <NavLink
                  reloadDocument={true}
                  key={data.id}
                  className="tab"
                  to={`${data.link}`}
                  style={({ isActive }) => (isActive ? activeStyle : {})}
                >
                  {data.title}
                </NavLink>
              );
            })}
          </nav>
          <Search />
        </nav>
      </section>
    </header>
  );
}
export default Nav;
const NAV_TAB_DATAS = [
  { id: 1, title: '랭킹', link: '/rank' },
  { id: 2, title: '비교', link: '/compare' },
  {
    id: 3,
    title: '커뮤니티',
    link: '/articleList/4?offset=0&limit=10&sort=latest',
  },
];

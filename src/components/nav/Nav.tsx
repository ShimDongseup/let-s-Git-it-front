import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Login from '../../pages/login/Login';
import Search from '../search/Search';
import './Nav.scss';

function Nav() {
  const [activeLogin, setActivelogin] = useState(false);

  const handleLogin = (): void => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_REST_API_KEY}&redirect_uri=https://let-s-git-it.vercel.app/githublogin`;
    localStorage.setItem('referrer', window.location.href);
  };

  const openLogin = (): void => {
    setActivelogin(true);
  };

  const logOut = (): void => {
    alert('로그아웃 되었습니다!');
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    window.location.reload();
  };

  const activeStyle = {
    borderBottom: '1px solid #122e94',
    color: '#122e94',
    fontWeight: 'bold',
  };

  return (
    <header className="allNav">
      <nav className="subNav">
        {localStorage.getItem('token') ? (
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

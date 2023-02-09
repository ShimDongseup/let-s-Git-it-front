import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Search from '../search/Search';
import './Nav.scss';
import { useSetRecoilState } from 'recoil';
import { categoryState } from '../../atom';

function Nav() {
  const token = localStorage.getItem('token');
  const setActive = useSetRecoilState(categoryState);
  const communityDefault = () => {
    setActive((prev: number) => 4);
  };

  const logOut = (): void => {
    alert('로그아웃 되었습니다!');
    localStorage.removeItem('token');
  };

  const activeStyle = {
    color: '#122e94',
    fontWeight: 'bold',
    borderBottom: '1px solid #122e94',
  };

  return (
    <div className="allNav">
      <div className="subNav">
        {token ? (
          <NavLink
            className="subTab"
            to="/login"
            style={({ isActive }) => (isActive ? activeStyle : {})}
          >
            로그인
          </NavLink>
        ) : (
          <header className="subTabWrap">
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
          </header>
        )}
      </div>
      <div className="mainNavWrap">
        <div className="mainNav">
          <nav className="navTab">
            <Link className="logo" to="/">
              let's <span className="logoGit">GIT</span> it
            </Link>
            {NAV_TAB_DATAS.map(data => {
              return (
                <NavLink
                  key={data.id}
                  className="tab"
                  to={data.link}
                  style={({ isActive }) => (isActive ? activeStyle : {})}
                  onClick={communityDefault}
                >
                  {data.title}
                </NavLink>
              );
            })}
          </nav>
          <Search />
        </div>
      </div>
    </div>
  );
}

export default Nav;

const NAV_TAB_DATAS = [
  { id: 1, title: '랭킹', link: '/rank' },
  { id: 2, title: '커뮤니티', link: '/articleList/4' },
  { id: 3, title: '비교', link: '/compare' },
];

import React from 'react';
import { Link } from 'react-router-dom';
import Search from '../search/Search';
import './Nav.scss';

function Nav() {
  return (
    <div className="navWrap">
      <div className="navTab">
        <Link className="logo" to="/">
          let's <span className="logoGit">GIT</span> it
        </Link>
        <Link className="rank" to="/rank">
          랭킹
        </Link>
        <Link className="community" to="/articleList">
          커뮤니티
        </Link>
        <Link className="login" to="/login">
          로그인
        </Link>
      </div>
      <Search />
    </div>
  );
}

export default Nav;

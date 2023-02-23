import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Login from '../../pages/login/Login';
import './footer.scss';

function Footer() {
  const navigate = useNavigate();
  const [footerInput, setFooterInput] = useState<string>('');
  const [activeLogin, setActivelogin] = useState(false);
  const openLogin = () => {
    setActivelogin(true);
  };
  const handleFooterInput = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setFooterInput(e.target.value);
  };

  const moveTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_REST_API_KEY}&redirect_uri=https://let-s-git-it.vercel.app/githublogin`;
  };

  return (
    <footer>
      <div className="footerInner">
        <div className="footerLogo">
          <Link to="/">
            <img
              src="../images/icon/footerlogo.png"
              alt="logo"
              onClick={moveTop}
            />
          </Link>
          <div className="footerDev">
            <p>by 오현상 이명석 지송현 김보윤 박지영 심동섭 홍석현</p>
          </div>
        </div>
        <div className="footerMenu">
          {FOOTER_LIST.map(({ id, title, list }) => {
            return (
              <div className="footerList" key={id}>
                <h3>{title}</h3>
                <ul>
                  {list.map(({ id, listTitle, path }) => {
                    return (
                      <React.Fragment key={id}>
                        {listTitle === 'Login' ? (
                          <>
                            <li
                              onClick={() => {
                                if (window.screen.width > 480) {
                                  moveTop();
                                  openLogin();
                                } else {
                                  handleLogin();
                                }
                              }}
                            >
                              Login
                            </li>
                            <Login
                              active={activeLogin}
                              setActiveLogin={setActivelogin}
                            />
                          </>
                        ) : (
                          <li
                            onClick={() => {
                              moveTop();
                              navigate(path);
                            }}
                          >
                            {listTitle}
                          </li>
                        )}
                      </React.Fragment>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
        <div className="footerInfo">
          <div className="footerSearch">
            <p>
              16가지의 지표로 github 활동을 분석한 let's GIT it을 바로 이용해
              보세요!
            </p>
            <input
              type="text"
              placeholder="유저검색"
              onChange={handleFooterInput}
              value={footerInput}
              onKeyDown={(e: { key: string }) => {
                if (e.key === 'Enter') {
                  navigate(`/userDetail/${footerInput}`);
                  setFooterInput('');
                  moveTop();
                }
              }}
            />
            <button
              onClick={() => {
                navigate(`/userDetail/${footerInput}`);
                setFooterInput('');
                moveTop();
              }}
            >
              점수 보러가기
            </button>
          </div>
        </div>
      </div>
      <div className="footerRight">
        <p>COPYRIGHT © LET'S GIT IT. ALL RIGHT RESERVED.</p>
        <a href="mailto:letsgititqa@gmail.com" className="footerContact">
          CONTACT US
        </a>
      </div>
    </footer>
  );
}

export default Footer;
const FOOTER_LIST = [
  {
    id: 1,
    title: 'Account',
    list: [
      { id: 1, listTitle: 'Login', path: '/login' },
      { id: 3, listTitle: 'Mypage', path: '/mypage' },
    ],
  },
  {
    id: 2,
    title: 'Rank',
    list: [
      { id: 1, listTitle: 'TOP 100', path: '/rank' },
      { id: 2, listTitle: 'Compare', path: '/compare' },
    ],
  },
  {
    id: 3,
    title: 'Community',
    list: [
      {
        id: 1,
        listTitle: 'Community',
        path: '/articleList/4?offset=0&limit=10&sort=latest',
      },
      {
        id: 2,
        listTitle: 'Dev News',
        path: '/articleList/2?offset=0&limit=10&sort=latest',
      },
      {
        id: 3,
        listTitle: 'Report',
        path: '/articleList/3?offset=0&limit=10&sort=latest',
      },
    ],
  },
];

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './footer.scss';

function Footer() {
  const navigate = useNavigate();
  const [footerInput, setFooterInput] = useState<string>('');

  const handleFooterInput = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setFooterInput(e.target.value);
  };

  const moveTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer>
      <div className="footerInner">
        <div className="footerLogo">
          <Link to="/">
            <img
              src="./images/icon/footerlogo.png"
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
                      <Link to={path} key={id}>
                        <li onClick={moveTop}>{listTitle}</li>
                      </Link>
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
            />
            <button
              onClick={() => {
                navigate(`/userDetail/${footerInput}`);
                setFooterInput('');
              }}
            >
              점수 보러가기
            </button>
          </div>
        </div>
      </div>
      <div className="footerRight">
        <p>COPYRIGHT © LET'S GIT IT. ALL RIGHT RESERVED.</p>
        <p className="footerContact">CONTACT US</p>
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
      { id: 2, listTitle: 'Join', path: '/signup' },
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
      { id: 1, listTitle: 'Community', path: '/articleList/4' },
      { id: 2, listTitle: 'Dev News', path: '/articleList/2' },
      { id: 3, listTitle: 'Report', path: '/articleList/3' },
    ],
  },
];

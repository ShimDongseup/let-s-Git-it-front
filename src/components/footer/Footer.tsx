import React from 'react';
import FOOTER_LIST from './footerList';
import './footer.scss';

function Footer() {
  return (
    <footer>
      <div className="footerInner">
        <div className="footerLogo">
          <img src="./images/icon/footerlogo.png" alt="logo" />
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
                  {list.map(({ id, listTitle }) => {
                    return <li key={id}>{listTitle}</li>;
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
            <input type="text" placeholder="유저검색" />
            <button>점수 보러가기</button>
          </div>
        </div>
      </div>
      <div className="footerRight">
        <p>COPYRIGHT © LET'S GIT IT. ALL RIGHT RESERVED.</p>
        <p>CONTACT US</p>
      </div>
    </footer>
  );
}

export default Footer;

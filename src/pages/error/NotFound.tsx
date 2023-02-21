import React from 'react';
import './ErrorPage.scss';

function NotFound() {
  return (
    <section className="errorPage">
      <header className="errorWrap">
        <div className="logo">let's GIT it!</div>
        <div className="errMsg">404 Page Not Found</div>
        <div className="noPage">페이지가 존재하지 않습니다</div>
        <div className="detailMsg">
          링크를 잘못 입력하셨거나 페이지가 삭제/이동되었을 수 있습니다
        </div>
      </header>
    </section>
  );
}

export default NotFound;

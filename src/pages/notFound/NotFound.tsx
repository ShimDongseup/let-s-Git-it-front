import React from 'react';
import './NotFound.scss';

const NotFound = () => {
  return (
    <div className="eee">
      <div className="errorPage">
        <div className="errorWrap">
          <div className="errMsg">404 Error</div>
          <div className="notFound">주소를 확인해주세요</div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

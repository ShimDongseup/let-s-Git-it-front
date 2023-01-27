import React from 'react';
import './Signup.scss';

function Signup() {
  return (
    <div className="wrapper">
      <div className="wrapSignup">
        <h1>환영합니다!</h1>
        <h2>기본 회원 정보를 등록해주세요.</h2>
        <div className="choice">
          <h3 className="choiceTitle">국적을 선택해주세요</h3>
          <div className="choiceChange">
            <div className="choiceMenu">
              <div className="selected">
                국적
                <div className="downIcon material-symbols-outlined">
                  expand_more
                </div>
              </div>
              <ul className="dropDown">
                <li>내국인</li>
                <li>FOREIGNER</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="choice">
          <h3 className="choiceTitle">개발분야를 선택해주세요</h3>
          <div className="choiceChange">
            <div className="choiceMenu">
              <div className="selected">
                개발분야
                <div className="downIcon material-symbols-outlined">
                  expand_more
                </div>
              </div>
              <ul className="dropDown">
                <li>프로트엔드</li>
                <li>백엔드</li>
                <li>안드로이드</li>
                <li>ios</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="choice">
          <h3 className="choiceTitle">경력을 선택해주세요</h3>
          <div className="choiceChange">
            <div className="choiceMenu">
              <div className="selected">
                경력
                <div className="downIcon material-symbols-outlined">
                  expand_more
                </div>
              </div>
              <ul className="dropDown">
                <li>학생</li>
                <li>신입</li>
                <li>1년차</li>
                <li>2년차</li>
                <li>3년차</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="wrapBtn">
          <button className="cancleBtn">취소</button>
          <button className="registerBtn">등록</button>
        </div>
      </div>
    </div>
  );
}

export default Signup;

import React from 'react';
import './Login.scss';

function Login() {
  return (
    <div className="wrapLogin">
      <div className="wrapLoginBox">
        <div className="loginLeft">
          <img src="/images/loginImg.jpg" alt="loginImg" className="loginImg" />
          <h2>환영합니다!</h2>
        </div>
        <div className="loginRight">
          <div className="close material-symbols-outlined">close</div>
          <div className="loginBtn">
            <img
              src="/images/github_logo.png"
              alt="githubLogo"
              className="githubLogo"
            />
            <span>로 로그인하기</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

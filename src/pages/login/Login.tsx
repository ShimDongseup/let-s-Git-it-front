import React from 'react';
import './Login.scss';

function Login(props: {
  active: boolean;
  setActiveLogin: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const closeLogin = () => {
    props.setActiveLogin(false);
  };

  const handleLogin = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_REST_API_KEY}&redirect_uri=https://let-s-git-it.vercel.app/githublogin`;
    props.setActiveLogin(false);
  };
  return (
    <div
      className="wrapLogin"
      style={{ display: props.active ? 'block' : 'none' }}
    >
      <div className="wrapLoginBox">
        <div className="loginLeft">
          <img src="/images/loginImg.jpg" alt="loginImg" className="loginImg" />
          <h2>환영합니다!</h2>
        </div>
        <div className="loginRight">
          <div className="close material-symbols-outlined" onClick={closeLogin}>
            close
          </div>
          <div className="loginBtn" onClick={handleLogin}>
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

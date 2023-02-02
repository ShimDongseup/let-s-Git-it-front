import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import './Signup.scss';

type CategoryType = {
  nationality: string[];
  field: string[];
  career: (string | number)[];
};
type UserType = {
  nationality: string;
  filed: string;
  career: string | number;
};

function Signup(): JSX.Element {
  const [category, setCategory] = useState<CategoryType>();
  const [user, setUser] = useState<UserType>({
    nationality: '국적',
    filed: '개발분야',
    career: '경력',
  });
  useEffect(() => {
    fetch('./data/signupCategory.json')
      .then(res => res.json())
      .then(data => setCategory(data[0]));
  }, []);

  const navigate = useNavigate();

  const onNavigate = () => navigate('/');

  const registerUser = () => {
    if (
      user.nationality === '국적' ||
      user.filed === '개발분야' ||
      user.career === '경력'
    ) {
      alert('선택을 완료해 주세요');
    } else {
      // fetch('유저정보등록api주소/auth/sign-up', {
      //   method: 'post',
      // });
    }
  };

  return (
    <div className="wrapper">
      <div className="wrapSignup">
        <h1>환영합니다!</h1>
        <h2>기본 회원 정보를 등록해주세요.</h2>
        <div className="choice">
          <h3 className="choiceTitle">국적을 선택해주세요</h3>
          <div className="choiceChange">
            <div className="choiceMenu">
              <Form.Select
                className="selected"
                onChange={e =>
                  setUser({ ...user, nationality: e.target.value })
                }
              >
                {category?.nationality.map((str: string, index: number) => {
                  return (
                    <option key={index} value={str}>
                      {str}
                    </option>
                  );
                })}
              </Form.Select>
            </div>
          </div>
        </div>
        <div className="choice">
          <h3 className="choiceTitle">개발분야를 선택해주세요</h3>
          <div className="choiceChange">
            <div className="choiceMenu">
              <Form.Select
                className="selected"
                onChange={e => setUser({ ...user, filed: e.target.value })}
              >
                {category?.field.map((str: string, index: number) => {
                  return (
                    <option key={index} value={str}>
                      {str}
                    </option>
                  );
                })}
              </Form.Select>
            </div>
          </div>
        </div>
        <div className="choice">
          <h3 className="choiceTitle">경력을 선택해주세요</h3>
          <div className="choiceChange">
            <div className="choiceMenu">
              <Form.Select
                className="selected"
                onChange={e => setUser({ ...user, career: e.target.value })}
              >
                {category?.career.map((str: string | number, index: number) => {
                  return (
                    <option key={index} value={str}>
                      {str}
                    </option>
                  );
                })}
              </Form.Select>
            </div>
          </div>
        </div>
        <div className="wrapBtn">
          <button className="cancleBtn" onClick={onNavigate}>
            취소
          </button>
          <button className="registerBtn" onClick={registerUser}>
            등록
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;

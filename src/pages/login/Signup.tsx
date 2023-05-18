import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { CategoryType, SignupUserType } from '../../../@types/Account';
import './Signup.scss';
import { accessToken } from '../../atom';
import { useSetRecoilState } from 'recoil';

function Signup(): JSX.Element {
  const navigate = useNavigate();
  const [category, setCategory] = useState<CategoryType>();
  const [user, setUser] = useState<SignupUserType>({
    isKorean: 0,
    fieldId: 0,
    careerId: 0,
  });
  const setAccessToken = useSetRecoilState(accessToken);

  useEffect(() => {
    if (
      !localStorage.getItem('githubId') &&
      !localStorage.getItem('userName')
    ) {
      alert('비정상적인 접근입니다.');
      navigate(-1);
    }
    //가입정보 카테고리 조회
    axios
      .get(`api/auth/category`)
      .then(res => setCategory(res.data))
      .catch(err => console.log(err));
  }, []);

  const onNavigate = () => navigate('/');

  const registerUser = () => {
    if (user.isKorean === 0 || user.fieldId === 0 || user.careerId === 0) {
      alert('선택을 완료해 주세요');
    } else {
      axios
        .post(`api/auth/sign-up`, {
          isKorean: user.isKorean,
          fieldId: user.fieldId,
          careerId: user.careerId,
          githubId: Number(localStorage.getItem('githubId')),
          userName: localStorage.getItem('userName'),
        })
        .then(res => {
          if (res.status !== 201) {
            throw new Error('회원가입에 실패하였습니다.');
          } else {
            alert('회원가입에 성공하였습니다!');
            setAccessToken(res.data.accessToken);
            localStorage.removeItem('githubId');
            window.location.href = localStorage.getItem('referrer') as string;
            localStorage.removeItem('referrer');
          }
        })
        .catch(err => alert(err));
    }
  };
  return (
    <div className="wrapper">
      <main className="wrapSignup">
        <h1>환영합니다!</h1>
        <h2>기본 회원 정보를 등록해주세요.</h2>
        <section className="choice">
          <h3 className="choiceTitle">국적을 선택해주세요</h3>
          <div className="choiceChange">
            <div className="choiceMenu">
              <Form.Select
                className="selected"
                onChange={e => {
                  if (e.target.value === '0') {
                    setUser({ ...user, isKorean: 0 });
                  } else if (e.target.value === '1') {
                    setUser({ ...user, isKorean: true });
                  } else if (e.target.value === '2') {
                    setUser({ ...user, isKorean: false });
                  }
                }}
              >
                <option value={0}>국적</option>
                <option value={1}>내국인</option>
                <option value={2}>외국인</option>
              </Form.Select>
            </div>
          </div>
        </section>
        <section className="choice">
          <h3 className="choiceTitle">개발분야를 선택해주세요</h3>
          <div className="choiceChange">
            <div className="choiceMenu">
              <Form.Select
                className="selected"
                onChange={e =>
                  setUser({ ...user, fieldId: Number(e.target.value) })
                }
              >
                <option value={0}>개발분야</option>
                {category?.field.map(
                  (obj: { id: number; name: string }, index: number) => {
                    return (
                      <option key={index} value={obj.id}>
                        {obj.name}
                      </option>
                    );
                  }
                )}
              </Form.Select>
            </div>
          </div>
        </section>
        <section className="choice">
          <h3 className="choiceTitle">경력을 선택해주세요</h3>
          <div className="choiceChange">
            <div className="choiceMenu">
              <Form.Select
                className="selected"
                onChange={e =>
                  setUser({ ...user, careerId: Number(e.target.value) })
                }
              >
                <option value={0}>경력</option>
                {category?.career.map(
                  (obj: { id: number; period: string }, index: number) => {
                    return (
                      <option key={index} value={obj.id}>
                        {obj.period}
                      </option>
                    );
                  }
                )}
              </Form.Select>
            </div>
          </div>
        </section>
        <div className="wrapBtn">
          <button className="cancleBtn" onClick={onNavigate}>
            취소
          </button>
          <button className="registerBtn" onClick={registerUser}>
            등록
          </button>
        </div>
      </main>
    </div>
  );
}

export default Signup;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import './Signup.scss';

type CategoryType = {
  field: {
    id: number;
    name: string;
  }[];
  career: {
    id: number;
    period: string;
  }[];
};
type UserType = {
  isKorean: number | boolean;
  filed: number;
  career: number;
};

function Signup(): JSX.Element {
  const [category, setCategory] = useState<CategoryType>();
  const [user, setUser] = useState<UserType>({
    isKorean: 0,
    filed: 0,
    career: 0,
  });
  useEffect(() => {
    //가입정보 카테고리 조회
    axios
      .get('./data/signupCategory.json')
      // .get('http://127.0.0.1:3000/auth/category')
      .then(res => setCategory(res.data))
      .catch(err => console.log(err));
  }, []);

  const navigate = useNavigate();

  const onNavigate = () => navigate('/');

  const registerUser = () => {
    if (user.isKorean === 0 || user.filed === 0 || user.career === 0) {
      alert('선택을 완료해 주세요');
    } else {
      axios
        .post('http://127.0.0.1:3000/auth/sign-up', {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
          data: {
            isKorean: user.isKorean,
            filedId: user.filed,
            careerId: user.career,
          },
        })
        .then(res => {
          if (res.status !== 201) {
            throw new Error('회원가입에 실패하였습니다.');
          } else {
            alert('회원가입에 성공하였습니다!');
            navigate('/');
          }
        })
        .catch(err => alert(err));
    }
  };
  // console.log(user);
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
        </div>
        <div className="choice">
          <h3 className="choiceTitle">개발분야를 선택해주세요</h3>
          <div className="choiceChange">
            <div className="choiceMenu">
              <Form.Select
                className="selected"
                onChange={e =>
                  setUser({ ...user, filed: Number(e.target.value) })
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
        </div>
        <div className="choice">
          <h3 className="choiceTitle">경력을 선택해주세요</h3>
          <div className="choiceChange">
            <div className="choiceMenu">
              <Form.Select
                className="selected"
                onChange={e =>
                  setUser({ ...user, career: Number(e.target.value) })
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

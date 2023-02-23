import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import './MyPage.scss';
import { FiThumbsUp } from 'react-icons/fi';
import { FaRegComment } from 'react-icons/fa';
import { BASE_URL } from '../../config';
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
  userName: string;
  profileText: string;
  profileImageUrl: string;
  email: string;
  careerId: number;
  fieldId: number;
  isKorean: number | boolean;
  posts: {
    id: number;
    title: string;
    subCategory: string;
    createdAt: string;
    commentNumber: number;
    likeNumber: number;
  }[];
};

function MyPage() {
  const navigate = useNavigate();
  const [category, setCategory] = useState<CategoryType>();
  const [user, setUser] = useState<UserType>({
    userName: '',
    profileText: '',
    profileImageUrl: '',
    email: '',
    careerId: 0,
    fieldId: 0,
    isKorean: 0,
    posts: [
      {
        id: 0,
        title: '',
        subCategory: '',
        createdAt: '',
        commentNumber: 0,
        likeNumber: 0,
      },
    ],
  });
  const [btnActive, setBtnActive] = useState<boolean>(true);
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      alert('로그인이 필요한 서비스 입니다.');
      navigate(-1);
    } else {
      // 셀렉트 메뉴리스트 불러오기
      axios
        .get(`${BASE_URL}/auth/category`)
        .then((res): void => setCategory(res.data));
      //마이페이지 정보 불러오기
      axios
        // .get('./data/myPageData.json')
        .get(`${BASE_URL}/user`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        .then((res): void => setUser(res.data));
    }
  }, []);

  const onBtnActive = (): void => {
    if (btnActive) {
      setBtnActive(!btnActive);
    } else {
      if (user.isKorean === 0 || user.fieldId === 0 || user.careerId === 0) {
        alert('선택을 완료해 주세요');
      } else {
        axios
          .patch(
            `${BASE_URL}/user`,
            {
              isKorean: user.isKorean,
              fieldId: user.fieldId,
              careerId: user.careerId,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          )
          .then((res): void => {
            if (res.status === 201 || 200) {
              alert('회원정보가 수정되었습니다.');
              setBtnActive(!btnActive);
            } else {
              throw Error('회원정보 수정에 실패하였습니다.');
            }
          })
          .catch((): void => alert('회원정보 수정에 실패하였습니다.'));
      }
    }
  };

  return (
    <div className="wrapper">
      <div className="wrapMyPage">
        <div className="profileCard">
          <div className="profileCardUpSide">
            <Link className="imgLink" to={`/userDetail/${user.userName}`}>
              <img src={user.profileImageUrl} alt="profileImage" />
            </Link>
            <Link className="userName" to={`/userDetail/${user.userName}`}>
              {user.userName}
            </Link>
            <span>{user.profileText}</span>
          </div>
          <div className="profileCardDownSide">
            <div className="profileInfo">
              <div className="material-icons mailIcon">email</div>
              <div className="emailAddress">
                {user.email ? user.email : '등록된 이메일이 없습니다.'}
              </div>
            </div>
          </div>
        </div>
        <div className="wrapRight">
          <div className="choice">
            <h2 className="choiceTitle">국적</h2>
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
                  disabled={btnActive}
                >
                  <option value={0}>국적</option>
                  <option value={1} selected={user.isKorean ? true : false}>
                    내국인
                  </option>
                  <option value={2} selected={user.isKorean ? false : true}>
                    외국인
                  </option>
                </Form.Select>
              </div>
            </div>
          </div>
          <div className="choice">
            <h2 className="choiceTitle">개발분야</h2>
            <div className="choiceChange">
              <div className="choiceMenu">
                <Form.Select
                  className="selected"
                  onChange={e =>
                    setUser({ ...user, fieldId: Number(e.target.value) })
                  }
                  disabled={btnActive}
                >
                  <option value={0}>개발분야</option>
                  {category?.field.map(
                    (obj: { id: number; name: string }, index: number) => {
                      if (user.fieldId === obj.id) {
                        return (
                          <option key={index} value={obj.id} selected>
                            {obj.name}
                          </option>
                        );
                      } else {
                        return (
                          <option key={index} value={obj.id}>
                            {obj.name}
                          </option>
                        );
                      }
                    }
                  )}
                </Form.Select>
              </div>
              {/* <button>수정</button> */}
            </div>
          </div>
          <div className="choice">
            <h2 className="choiceTitle">경력</h2>
            <div className="choiceChange">
              <div className="choiceMenu">
                <Form.Select
                  className="selected"
                  onChange={e =>
                    setUser({ ...user, careerId: Number(e.target.value) })
                  }
                  disabled={btnActive}
                >
                  <option value={0}>경력</option>
                  {category?.career.map(
                    (obj: { id: number; period: string }, index: number) => {
                      if (user.careerId === obj.id) {
                        return (
                          <option key={index} value={obj.id} selected>
                            {obj.period}
                          </option>
                        );
                      } else {
                        return (
                          <option key={index} value={obj.id}>
                            {obj.period}
                          </option>
                        );
                      }
                    }
                  )}
                </Form.Select>
              </div>
              <button onClick={onBtnActive}>
                {btnActive ? '수정' : '완료'}
              </button>
            </div>
          </div>
          <div className="myArticleList">
            <h2>최근 글 작성 목록</h2>
            <ul className="articleList">
              {user.posts?.map((obj, index) => {
                const date = obj.createdAt.substring(0, 10);
                if (index < 10) {
                  return (
                    <li key={index}>
                      <Link className="articleItem" to={`/article/${obj.id}`}>
                        <div className="articleNum">{index + 1}</div>
                        <div className="articleInfo">
                          <div className="articleTitle">{obj.title}</div>
                          <div className="info">
                            <div className="category">{obj.subCategory} |</div>
                            <div className="time">{date}</div>
                          </div>
                        </div>
                        <div className="recommend">
                          <FiThumbsUp className="up" />
                          {obj.likeNumber}
                        </div>
                        <div className="myPageComment">
                          <FaRegComment className="commentIcon" />
                          {obj.commentNumber}
                        </div>
                      </Link>
                    </li>
                  );
                }
              })}
              {user.posts.length === 0 && <div>작성된 글이 없습니다.</div>}
              {user.posts.length >= 0 && (
                <div className="latestArticle">
                  최근 10건에 대한 목록만 나타납니다.
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;

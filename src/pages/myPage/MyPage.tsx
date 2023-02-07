import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import './MyPage.scss';
import { FiThumbsUp } from 'react-icons/fi';
import { FaRegComment } from 'react-icons/fa';
import Profile from '../../components/profile/Profile';
type CategoryType = {
  nationality: string[];
  field: string[];
  career: (string | number)[];
};
type UserType = {
  nationality: string;
  filed: string;
  career: string | number;
  articleList: {
    id: string;
    title: string;
    category: string;
    date: string;
    like: number | string;
    comment: number | string;
  }[];
};
type Rank = {
  id: string;
  userName: string;
  repo: string;
  follow: string;
  following: string;
  company: string;
  location: string;
  stars: string;
  blog: string;
  mail: string;
};
function MyPage() {
  const [profile, setProfile] = useState<Rank[]>([]);
  const [category, setCategory] = useState<CategoryType>();
  const [user, setUser] = useState<UserType>({
    nationality: '',
    filed: '',
    career: '',
    articleList: [],
  });
  const [btnActive, setBtnActive] = useState(true);
  useEffect(() => {
    //프로필카드 정보 불러오기
    fetch('./data/userInfo.json')
      .then(res => res.json())
      .then(data => setProfile(data));
    // 셀렉트 메뉴리스트 불러오기
    fetch('./data/signupCategory.json')
      .then(res => res.json())
      .then(data => setCategory(data[0]));
    //마이페이지 정보 불러오기
    fetch('./data/myPageData.json')
      .then(res => res.json())
      .then(data => setUser(data[0]));
  }, []);

  const onBtnActive = () => {
    if (btnActive) {
      setBtnActive(!btnActive);
    } else {
      if (
        user.nationality === '국적' ||
        user.filed === '개발분야' ||
        user.career === '경력'
      ) {
        alert('선택을 완료해 주세요');
      } else {
        // fetch('유저정보등록api주소/user', {
        //   method: 'patch',
        // });
        setBtnActive(!btnActive);
      }
    }
  };
  console.log(user);
  return (
    <div className="wrapper">
      <div className="wrapMyPage">
        <div className="profileCard">
          <Profile user={profile} />
        </div>
        <div className="wrapRight">
          <div className="choice">
            <h2 className="choiceTitle">국적</h2>
            <div className="choiceChange">
              <div className="choiceMenu">
                <Form.Select
                  className="selected"
                  onChange={e =>
                    setUser({ ...user, nationality: e.target.value })
                  }
                  disabled={btnActive}
                >
                  {category?.nationality.map((str: string, index: number) => {
                    if (user.nationality === str) {
                      return (
                        <option key={index} value={str} selected>
                          {str}
                        </option>
                      );
                    } else {
                      return (
                        <option key={index} value={str}>
                          {str}
                        </option>
                      );
                    }
                  })}
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
                  onChange={e => setUser({ ...user, filed: e.target.value })}
                  disabled={btnActive}
                >
                  {category?.field.map((str: string, index: number) => {
                    if (user.filed === str) {
                      return (
                        <option key={index} value={str} selected>
                          {str}
                        </option>
                      );
                    } else {
                      return (
                        <option key={index} value={str}>
                          {str}
                        </option>
                      );
                    }
                  })}
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
                  onChange={e => setUser({ ...user, career: e.target.value })}
                  disabled={btnActive}
                >
                  {category?.career.map(
                    (str: string | number, index: number) => {
                      if (user.career === str) {
                        return (
                          <option key={index} value={str} selected>
                            {str}
                          </option>
                        );
                      } else {
                        return (
                          <option key={index} value={str}>
                            {str}
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
            <h2>내가 작성한 글 목록</h2>
            <ul className="articleList">
              {user?.articleList.map((obj, index) => {
                return (
                  <li key={index}>
                    <Link className="articleItem" to={`/article/${obj.id}`}>
                      <div className="articleNum">{index + 1}</div>
                      <div className="articleInfo">
                        <div className="articleTitle">{obj.title}</div>
                        <div className="info">
                          <div className="category">{obj.category} |</div>
                          <div className="time">{obj.date}</div>
                        </div>
                      </div>
                      <div className="recommend">
                        <FiThumbsUp className="up" />
                        {obj.like}
                      </div>
                      <div className="comment">
                        <FaRegComment className="commentIcon" />
                        {obj.comment}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;

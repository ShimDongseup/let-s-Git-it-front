import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios, { AxiosResponse } from 'axios';
import { FaRegThumbsUp, FaThumbsUp, FaRegComment } from 'react-icons/fa';
import { HiOutlineShare } from 'react-icons/hi';
import { AiOutlineAlert } from 'react-icons/ai';
import Comment from '../article/Comment';
import CommentList from './CommentList';
import ArticleMenu from '../articleMenu/ArticleMenu';
import './Article.scss';

type ArticleData = {
  id: string;
  header: string;
  content: string;
  writer: string;
  tier: string;
  commentNum: number;
  likesNum: number;
};

function Article() {
  const [article, setArticle] = useState<ArticleData[]>([]);
  const [likes, setLikes] = useState<number>(5); // 초기값 article.likesNum
  const [isCheckLikes, setIsCheckLikes] = useState<boolean>(false);

  const postId = useParams<string>();
  const token = localStorage.getItem('token');

  const loadArticle = () => {
    axios
      .get(`/community/posts/${postId}`, {
        headers: {
          token: token,
        },
      })
      .then(res => setArticle(res.data))
      .catch(err => {
        if (err.response) {
          console.log(err.response);
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log('err', err.message);
        }
      });
  };

  const loadLikesNum = () => {
    axios
      .post(`community/likes/${postId}`, {
        headers: {
          token: token,
        },
        data: {
          likes: likes,
        },
      })
      .then(res => loadArticle());
  };

  const clickThumbsUp = () => {
    setIsCheckLikes(isCheckLikes => !isCheckLikes);
    isCheckLikes ? setLikes(likes - 1) : setLikes(likes + 1);
    loadLikesNum();
  };

  useEffect(() => {
    loadArticle();
  }, []);

  return (
    <div className="articlePage">
      <div className="listAndArticle">
        <ArticleMenu />
        <div className="articleWrap">
          <header className="headerWrap">
            <div className="title">제목제목제목제목</div>
            <div className="titleInner">
              <ul>
                <li className="category">카테고리</li>
                <li className="slash">|</li>
                <li className="date">2023.01.26</li>
                <li className="slash">|</li>
                <li className="writer">글쓴이</li>
              </ul>
            </div>
          </header>
          <main className="mainWrap">
            <div className="article">
              다 나는 별이 까닭입니다. 가을로 내 된 계절이 별들을 별 있습니다.
              그리고 청춘이 가난한 걱정도 프랑시스 이름자 버리었습니다. 별에도
              새겨지는 다 밤을 별 보고, 버리었습니다. 어머니 아스라히 별 릴케
              보고, 까닭입니다. 까닭이요, 이름을 노루, 아스라히 너무나 나는 차
              하나에 불러 계십니다. 헤는 이국 강아지, 가득 불러 내린 불러
              버리었습니다. 멀듯이, 오는 별 까닭입니다. 이런 봄이 오는 무엇인지
              이름과 노새, 했던 딴은 거외다. 별빛이 하나 없이 겨울이 하나에 벌써
              너무나 있습니다. 된 둘 경, 하나에 있습니다. <br />
              위에도 어머니, 불러 헤는 말 까닭입니다. 어머니 별에도 지나가는
              자랑처럼 오면 마디씩 가득 계십니다. 파란 가득 못 된 하나에 가난한
              있습니다. 아무 못 위에 강아지, 별 한 말 이름과 내일 있습니다. 불러
              책상을 헤일 소녀들의 위에도 릴케 북간도에 봅니다. 하늘에는
              북간도에 못 봅니다. 겨울이 별들을 무엇인지 봅니다. 하나 까닭이요,
              가득 밤이 별 아침이 겨울이 소학교 이네들은 까닭입니다. 까닭이요,
              이름과,
            </div>
            <section className="mainBottom">
              <div className="thumsCommentIcons">
                <div className="thumbsUpWrap">
                  {isCheckLikes === true ? (
                    <FaThumbsUp className="thumbsUp" onClick={clickThumbsUp} />
                  ) : (
                    <FaRegThumbsUp
                      className="thumbsUp"
                      onClick={clickThumbsUp}
                    />
                  )}

                  <span>{likes}</span>
                </div>
                <div className="commentIconWrap">
                  <FaRegComment className="comment" />
                  <span>15</span>
                </div>
              </div>
              <div className="shareSirenIcons">
                <HiOutlineShare className="share" />
                <AiOutlineAlert className="siren" />
              </div>
            </section>
          </main>
          <Comment />
          <CommentList />
        </div>
      </div>
    </div>
  );
}

export default Article;

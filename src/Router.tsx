import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Nav from './components/nav/Nav';
import NotFound from './pages/error/NotFound';
import Article from './pages/community/article/Article';
import ArticleList from './pages/community/articleList/ArticleList';
import AriticleModify from './pages/community/articleWrite/AriticleModify';
import ArticleWrite from './pages/community/articleWrite/ArticleWrite';
import Compare from './pages/compare/Compare';
import GithubLogin from './pages/login/GithubLogin';
import Signup from './pages/login/Signup';
import Main from './pages/main/Main';
import MyPage from './pages/myPage/MyPage';
import Rank from './pages/rank/Rank';
import UserDetail from './pages/userDetail/UserDetail';
import NoArticle from './pages/error/NoArticle';

const Router = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/githublogin" element={<GithubLogin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Main />} />
        <Route path="/rank" element={<Rank />} />
        <Route path="/userDetail/:userName" element={<UserDetail />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/articleList" element={<ArticleList />} />
        <Route path="/articleWrite" element={<ArticleWrite />} />
        <Route path="/articleModify/:id" element={<AriticleModify />} />
        <Route path="/noArticle" element={<NoArticle />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;

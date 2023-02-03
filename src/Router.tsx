import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Nav from './components/nav/Nav';
import Article from './pages/community/article/Article';
import ArticleList from './pages/community/articleList/ArticleList';
import ArticleWrite from './pages/community/articleWrite/ArticleWrite';
import Compare from './pages/compare/Compare';
import Login from './pages/login/Login';
import Signup from './pages/login/Signup';
import Main from './pages/main/Main';
import MyPage from './pages/myPage/MyPage';
import Rank from './pages/rank/Rank';
import UserDetail from './pages/userDetail/UserDetail';

const Router = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Main />} />
        <Route path="/rank" element={<Rank />} />
        <Route path="/userDetail" element={<UserDetail />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/articleList" element={<ArticleList />} />
        <Route path="/articleWrite" element={<ArticleWrite />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;

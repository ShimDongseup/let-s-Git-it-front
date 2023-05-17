import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './Router';
import './styles/reset.scss';
import './styles/common.scss';
import axios from 'axios';

axios.defaults.withCredentials = true; // React 최상단 index.tsx에서 axios에 withCredentials를 true로 설정해줘야 refreshToken cookie를 주고받을 수 있다.

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<Router />);

import { render, screen } from '@testing-library/react';
import exp from 'constants';
import { rest } from 'msw';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BASE_URL } from '../../config';
import { server } from '../../mocks/server';
import UserDetail from '../userDetail/UserDetail';

describe('userDetail', () => {
  test('에로가 났을때 에러 메세지를 보여준다', async () => {
    server.user(
      rest.get(`${BASE_URL}/ranks/MatheGoD`, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    render(
      <BrowserRouter>
        <Routes>
          <Route path="userDetail/:userName" element={<UserDetail />} />
        </Routes>
      </BrowserRouter>
    );
    const error = await screen.findByText('존재하지 않는 사용자입니다.');
    expect(error).toBeInTheDocument();
  });
  test('유저정보가 잘 들어온다', async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="userDetail/:userName" element={<UserDetail />} />
        </Routes>
      </BrowserRouter>
    );
    const user = screen.findAllByRole('MatheGoD');
    expect(user).toHaveLength(1);
  });
});

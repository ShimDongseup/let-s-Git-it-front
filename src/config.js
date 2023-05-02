// export const BASE_URL = 'https://api.lets-git-it.online';
export const BASE_URL = 'http://13.209.97.150:3000'; // 개발서버
export const TOKEN = `Bearer ${localStorage.getItem('token')}`;
export const HEADERS = { headers: { Authorization: `${TOKEN}` } };

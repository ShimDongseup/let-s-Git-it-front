export const BASE_URL = 'https://api.lets-git-it.online'; // 개발서버
export const TOKEN = `Bearer ${localStorage.getItem('token')}`;
export const HEADERS = { headers: { Authorization: `${TOKEN}` } };

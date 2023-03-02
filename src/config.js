export const BASE_URL = 'https://api.lets-git-it.online';
export const TOKEN = `Bearer ${localStorage.getItem('token')}`;

export const HEADERS = { headers: { Authorization: `${TOKEN}` } };

export const BASE_URL = 'http://3.39.193.95:3000';
export const TOKEN = `Bearer ${localStorage.getItem('token')}`;

export const HEADERS = { headers: { Authorization: `${TOKEN}` } };

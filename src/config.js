export const BASE_URL = 'http://13.209.97.150:3000';
export const TOKEN = `Bearer ${localStorage.getItem('token')}`;
export const HEADERS = { headers: { Authorization: `${TOKEN}` } };

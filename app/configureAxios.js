import axios from 'axios';

export const acnhapi = axios.create({
  baseURL: 'http://acnhapi.com',
});

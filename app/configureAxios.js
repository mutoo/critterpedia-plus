import axios from 'axios';

export const achnapi = axios.create({
  baseURL: 'http://acnhapi.com/',
});

import axios from 'axios';

export const acnhapi = axios.create({
  baseURL: 'http://acnhapi.com/v1a',
});

export const acnhcdn = axios.create({
  baseURL: 'https://acnhcdn.com/latest',
});

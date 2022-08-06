import axios from 'axios';

const { BASE_URL } = process.env;

const api = axios.create({
  baseURL: BASE_URL
});

export { api }
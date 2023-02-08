import axios from 'axios';

const { BASE_URL } = process.env;
const { TOKEN_B } = process.env;

const bibleUrl = 'https://www.abibliadigital.com.br/api';

const api = axios.create({
  baseURL: BASE_URL,
});

const bible = axios.create({
  baseURL: bibleUrl,
  headers: {
    Authorization: `Bearer ${TOKEN_B}`,
  }
});

export { api, bible };
import applyCaseMiddleware from 'axios-case-converter';
import axios from 'axios';

const options = {
  ignoreHeaders: true,
};

// TODO urlを設定ファイルに書くこと
const client = applyCaseMiddleware(
  axios.create({
    baseURL: 'http://localhost:3001/api/v1',
  }),
  options
);

export default client;
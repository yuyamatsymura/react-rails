import applyCaseMiddleware from 'axios-case-converter';
import axios from 'axios';

const options = {
  ignoreHeaders: true,
};

// todo rails-URL
const client = applyCaseMiddleware(
  axios.create({
    baseURL: process.env.REACT_APP_API,
  }),
  options
);

export default client;
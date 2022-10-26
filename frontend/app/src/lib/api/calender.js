import client from './client';

// カレンダー作成
export const createCalender = () => {
  return client.post('/calender');
};

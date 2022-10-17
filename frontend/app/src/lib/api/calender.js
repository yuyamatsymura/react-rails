import client from './client';

// カレンダー（共有スペース）作成
export const createCalender = () => {
  return client.post('/calender');
};

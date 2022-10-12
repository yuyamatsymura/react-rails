import client from './client';

// スケジュール取得
export const getSchedule = (id) => {
  return client.get(`/schedules/${id}`);
};

// スケジュール追加
export const createSchedule = (params) => {
  return client.post('/schedules', params);
};
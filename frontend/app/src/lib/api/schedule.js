import client from './client';

// スケジュール取得
export const getSchedule = (calenderId) => {
  return client.get(`/schedules/${calenderId}`);
};

// スケジュール追加
export const createSchedule = (calenderId, params) => {
  return client.post(`/schedules/${calenderId}`, params);
};

//スケジュール更新
export const updateSchedule = (calenderId, id, params) => {
  return client.patch(`/schedules/${calenderId}/${id}`, params);
};

// スケジュール削除
export const deleteSchedule = (calenderId, id) => {
  return client.delete(`/schedules/${calenderId}/${id}`);
};
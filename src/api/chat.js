import { instance } from '../axios.js';

export const getUserChats = async (userId) => {
  return instance.get(`/chat/${userId}`);
};

export const getChats = async (firstId, secondId) => {
  return instance.post(`/chat`, {firstId, secondId});
};

export const getMessages = async (chatId) => {
  return instance.get(`/message/${chatId}`);
};

export const sendMessages = async (data) => {
  return instance.post(`/message`, data);
};

export const findUser = async (id) => {
  const data = await instance.get(`/find/${id}`);
  return data.data;
}

export const getUsers = async () => {
  const data = await instance.get('/all/users');
  return data.data;
}

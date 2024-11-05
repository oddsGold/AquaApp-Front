import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  findUser,
  getChats, getMessages,
  getUserChats, getUsers, sendMessages,
} from '../../api/chat.js';

export const getCompanionUserInfo = createAsyncThunk(
  'chat/user',
  async (userId, thunkAPI) => {
    try {
      const response = await findUser(userId);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.data.message);
    }
  },
);

export const getAllUsers = createAsyncThunk(
  'chat/users',
  async (_, thunkAPI) => {
    try {
      const response = await getUsers();
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.data.message);
    }
  },
);

export const fetchUserChats = createAsyncThunk(
  'chat/fetchUserChats',
  async (userId, thunkAPI) => {
    try {
      const response = await getUserChats(userId);

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const createChats = createAsyncThunk(
  'chat/createChat',
  async ({ firstId, secondId }, thunkAPI) => {
    try {
      const response = await getChats(firstId, secondId);

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getUserMessages = createAsyncThunk(
  'chat/messages',
  async (chatId, thunkAPI) => {
    try {
      const response = await getMessages(chatId);

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const sendUserMessages = createAsyncThunk(
  'chat/send-messages',
  async (data, thunkAPI) => {
    console.log("data", data);
    try {
      const response = await sendMessages(data);

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);



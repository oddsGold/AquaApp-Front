import { createSlice } from '@reduxjs/toolkit';
import { SOCKET_INITIAL_STATE } from './initialState';
import { logOut } from '../auth/operations.js';

const socketSlice = createSlice({
  name: 'socket',
  initialState: SOCKET_INITIAL_STATE,
  reducers: {
    addReadNotification: (state, action) => {
      state.notifications = [
        { ...action.payload, isRead: true },
        ...state.notifications,
      ];
    },
    addUnreadNotification: (state, action) => {
      state.notifications = [action.payload, ...state.notifications];
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    updateNotification: (state, action) => {
      state.notifications = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(logOut.fulfilled, () => SOCKET_INITIAL_STATE);
  },
});

export const {
  addReadNotification,
  addUnreadNotification,
  clearNotifications,
  updateNotification
} = socketSlice.actions;

export default socketSlice.reducer;

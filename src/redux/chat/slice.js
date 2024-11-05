import { createSlice } from '@reduxjs/toolkit';
import {
  fetchUserChats, getAllUsers, getCompanionUserInfo, getUserMessages, sendUserMessages,
} from './operations';

import { CHAT_INITIAL_STATE } from './initialState';
import toast from 'react-hot-toast';
import { logOut } from '../auth/operations.js';

const chatSlice = createSlice({
  name: 'chat',
  initialState: CHAT_INITIAL_STATE,
  reducers: {
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
    setPotentialChat: (state, action) => {
      state.potentialChats = action.payload;
    },
    setCurrentRecipient: (state, action) => {
      state.currentRecipient = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getCompanionUserInfo.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      //Цей код додає інформацію про нового співрозмовника state.chat.users, якщо його ще немає.
      //Це корисно, коли користувач має кілька чатів, де присутні різні співрозмовники.
      .addCase(getCompanionUserInfo.fulfilled, (state, action) => {
        state.chat.users = state.chat.users || [];
        const userExists = state.chat.users.find(user => user._id === action.payload.user._id);
        if (!userExists) {
          state.chat.users.push(action.payload.user);
        }
      })
      .addCase(getCompanionUserInfo.rejected, (state) => {
        state.isLoading = false;
        toast.errorMessage = 'Something went wrong, try again later';
      })

      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(getAllUsers.rejected, (state) => {
        state.isLoading = false;
        toast.errorMessage = 'Something went wrong, try again later';
      })
      .addCase(fetchUserChats.pending, state => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchUserChats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.chats = action.payload.chats;
      })
      .addCase(fetchUserChats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

      .addCase(getUserMessages.pending, state => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getUserMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = action.payload;
      })
      .addCase(getUserMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

      .addCase(sendUserMessages.pending, state => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(sendUserMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.newMessage = action.payload.message;
      })
      .addCase(sendUserMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

      .addCase(logOut.fulfilled, () => CHAT_INITIAL_STATE);
  },
});

export const {
  setCurrentChat,
  setPotentialChat,
  setCurrentRecipient,
  setOnlineUsers,
} = chatSlice.actions;

export default chatSlice.reducer;

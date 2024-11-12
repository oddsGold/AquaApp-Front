import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

import { authReducer } from './auth/slice';
import watersReducer from './water/slice';
import chatsReducer from './chat/slice';
import socketReducer from './socket/slice.js';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

const socketPersistConfig = {
  key: 'socket',
  storage,
  whitelist: ['notifications'],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedSocketReducer = persistReducer(socketPersistConfig, socketReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    water: watersReducer,
    chats: chatsReducer,
    socket: persistedSocketReducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

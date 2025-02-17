// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { conversationReducer } from './conversationSlice';

const store = configureStore({
  reducer: {
    conversation: conversationReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;

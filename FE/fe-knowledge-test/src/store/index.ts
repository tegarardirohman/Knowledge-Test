// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

// Konfigurasi store dengan userReducer
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// Tipe untuk state global
export type RootState = ReturnType<typeof store.getState>;
// Tipe untuk dispatch
export type AppDispatch = typeof store.dispatch;

import {configureStore} from '@reduxjs/toolkit';
import authLoginReducer from '../features/authLoginSlice';
const store = configureStore({
  reducer: {
    authLogin: authLoginReducer,
  },
});

export default store;

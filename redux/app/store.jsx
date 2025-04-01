import {configureStore} from '@reduxjs/toolkit';
import authLoginReducer from '../features/authLoginSlice';
import getAppListSlice from '../features/getAppListSlice';
const store = configureStore({
  reducer: {
    authLogin: authLoginReducer,
    appList: getAppListSlice,
  },
});

export default store;

import {configureStore} from '@reduxjs/toolkit';
import authLoginReducer from '../features/authLoginSlice';
import getAppListSlice from '../features/getAppListSlice';
import deleteAppSlice from '../features/deleteAppSlice';
const store = configureStore({
  reducer: {
    authLogin: authLoginReducer,
    appList: getAppListSlice,
    deleteApp: deleteAppSlice,
  },
});

export default store;

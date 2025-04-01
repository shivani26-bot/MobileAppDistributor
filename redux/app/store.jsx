import {configureStore} from '@reduxjs/toolkit';
import authLoginReducer from '../features/authLoginSlice';
import authLogoutReducer from '../features/authLogoutSlice';
import authRegisterReducer from '../features/authRegisterSlice';
import getAppListSlice from '../features/getAppListSlice';
const store = configureStore({
  reducer: {
    authLogin: authLoginReducer,
    appList: getAppListSlice,
    authRegister: authRegisterReducer,
    authLogout: authLogoutReducer,
  },
});

export default store;

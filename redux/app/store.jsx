import {configureStore} from '@reduxjs/toolkit';
import authLoginReducer from '../features/authLoginSlice';
import authLogoutReducer from '../features/authLogoutSlice';
import authRegisterReducer from '../features/authRegisterSlice';
import deleteAppSlice from '../features/deleteAppSlice';
import getAppListSlice from '../features/getAppListSlice';
import getReleasesListSlice from '../features/getReleasesListSlice';
const store = configureStore({
  reducer: {
    authLogin: authLoginReducer,
    appList: getAppListSlice,
    deleteApp: deleteAppSlice,
    authRegister: authRegisterReducer,
    authLogout: authLogoutReducer,
    releasesList: getReleasesListSlice,
  },
});

export default store;

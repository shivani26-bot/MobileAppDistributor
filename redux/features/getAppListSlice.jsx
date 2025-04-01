import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {FRONTEND_URL} from '../../constant';
export const fetchAppList = createAsyncThunk(
  'fetchAppList',
  async accessToken => {
    try {
      console.log(accessToken);

      const response = await fetch(`${FRONTEND_URL}/api/app/getApplication`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: 'include',
      });
      const responseData = await response.json();
      console.log('rd', responseData);
      return responseData;
    } catch (error) {
      console.log('Error in login user data', error);
      throw error;
    }
  },
);

const getAppListSlice = createSlice({
  name: 'appList',
  initialState: {
    isLoading: false,
    data: null,
    items: [],
    isError: false,
  },

  extraReducers: builder => {
    builder.addCase(fetchAppList.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchAppList.fulfilled, (state, action) => {
      console.log('action', action); //{type: 'postLoginData/fulfilled', payload: {…}, meta: {…}}
      state.isLoading = false;
      state.items = action.payload.data;
      state.data = action.payload;
      state.isError = false;
      console.log('action', action); //{type: 'postLoginData/fulfilled', payload: {…}, meta: {…}}
      console.log('stateitems', state.items);
      console.log(state.data);
    });
    builder.addCase(fetchAppList.rejected, state => {
      state.isError = true;
    });
  },
});

export default getAppListSlice.reducer;

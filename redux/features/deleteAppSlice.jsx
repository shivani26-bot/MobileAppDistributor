import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {FRONTEND_URL} from '../../constant';
export const deleteApplication = createAsyncThunk(
  'deleteApplication',
  async ({accessToken, appId}) => {
    try {
      console.log('atai', accessToken, appId);

      const response = await fetch(
        `${FRONTEND_URL}/api/app/deleteApplication`,
        {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          credentials: 'include',
          body: JSON.stringify({
            _id: appId,
          }),
        },
      );
      const responseData = await response.json();
      console.log('rd', responseData);
      return responseData;
    } catch (error) {
      console.log('Error in login user data', error);
      throw error;
    }
  },
);

const deleteAppSlice = createSlice({
  name: 'deleteApp',
  initialState: {
    isLoading: false,
    data: null,

    isError: false,
  },

  extraReducers: builder => {
    builder.addCase(deleteApplication.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(deleteApplication.fulfilled, (state, action) => {
      console.log('action', action); //{type: 'postLoginData/fulfilled', payload: {…}, meta: {…}}
      state.isLoading = false;

      state.data = action.payload;
      state.isError = false;
      console.log('action', action); //{type: 'postLoginData/fulfilled', payload: {…}, meta: {…}}
    });
    builder.addCase(deleteApplication.rejected, state => {
      state.isError = true;
    });
  },
});

export default deleteAppSlice.reducer;

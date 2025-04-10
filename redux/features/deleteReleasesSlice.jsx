import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {FRONTEND_URL} from '../../constant';
export const deleteRelease = createAsyncThunk(
  'deleteRelease',
  async ({accessToken, releaseId}) => {
    try {
      console.log(accessToken, releaseId);

      const response = await fetch(
        `${FRONTEND_URL}/api/release/deleteRelease`,
        {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          credentials: 'include',
          body: JSON.stringify({_id: releaseId}),
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

const deleteReleasesSlice = createSlice({
  name: 'deleteRelease',
  initialState: {
    isLoading: false,
    data: null,

    isError: false,
  },

  extraReducers: builder => {
    builder.addCase(deleteRelease.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(deleteRelease.fulfilled, (state, action) => {
      console.log('action', action);
      state.isLoading = false;

      state.data = action.payload;
      state.isError = false;
      console.log('action', action);
    });
    builder.addCase(deleteRelease.rejected, state => {
      state.isError = true;
    });
  },
});

export default deleteReleasesSlice.reducer;

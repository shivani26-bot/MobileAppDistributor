import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {FRONTEND_URL} from '../../constant';

export const fetchReleasesList = createAsyncThunk(
  'fetchReleasesList',
  async ({accessToken, appId}) => {
    try {
      console.log(accessToken, appId);

      const response = await fetch(
        `${FRONTEND_URL}/api/release/getRelease/${appId}`,
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          credentials: 'include',
        },
      );
      const responseData = await response.json();
      console.log('Releases Data:', responseData);
      return responseData;
    } catch (error) {
      console.log('Error fetching releases list', error);
      throw error;
    }
  },
);

const getReleasesListSlice = createSlice({
  name: 'releasesList',
  initialState: {
    isLoading: false,
    data: null,
    items: [],
    isError: false,
  },
  extraReducers: builder => {
    builder.addCase(fetchReleasesList.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchReleasesList.fulfilled, (state, action) => {
      console.log('Fetched Releases:', action);
      state.isLoading = false;
      state.items = action.payload.data;
      state.data = action.payload;
      state.isError = false;
      console.log('Releases Items:', state.items);
      console.log(state.data);
    });
    builder.addCase(fetchReleasesList.rejected, state => {
      state.isError = true;
    });
  },
});

export default getReleasesListSlice.reducer;

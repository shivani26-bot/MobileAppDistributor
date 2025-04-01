import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {FRONTEND_URL} from '../../constant';

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, {rejectWithValue}) => {
    try {
      const response = await fetch(`${FRONTEND_URL}/api/user/register`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Registration failed');

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const authRegisterSlice = createSlice({
  name: 'authRegister',
  initialState: {user: null, loading: false, error: null},
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authRegisterSlice.reducer;

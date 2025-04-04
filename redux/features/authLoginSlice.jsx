import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {FRONTEND_URL} from '../../constant';
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, {rejectWithValue}) => {
    try {
      const response = await fetch(`${FRONTEND_URL}/api/user/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userData),
      });
      // const response = await fetch('http://172.20.10.3:8000/api/user/login', {
      //   method: 'POST',
      //   headers: {'Content-Type': 'application/json'},
      //   body: JSON.stringify(userData),
      // });

      const data = await response.json();
      console.log('API Response:', data);

      if (!data.success || !data.data) {
        throw new Error(data.message || 'Login failed');
      }

      await AsyncStorage.setItem('token', data.data);

      return {token: data.data, message: data.message};
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const authLoginSlice = createSlice({
  name: 'auth',
  initialState: {token: null, loading: false, error: null},
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authLoginSlice.reducer;

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {REHYDRATE} from 'redux-persist';
import * as api from '../api';

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (credentials, {rejectWithValue}) => {
    try {
      const res = await api.login(credentials);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);

const initialState = {
  user: null,
  token: null,
  isGuest: false,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    continueAsGuest(state) {
      state.isGuest = true;
      state.user = null;
      state.token = null;
      state.error = null;
    },
    logout() {
      return initialState;
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // A persisted 'loading' status would leave the Sign In button disabled
      // forever if the app was killed mid-request, so drop it on rehydrate.
      .addCase(REHYDRATE, (state, action) => {
        const saved = action.payload?.auth;
        if (!saved) {
          return state;
        }
        return {...state, ...saved, status: 'idle', error: null};
      })
      .addCase(signIn.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isGuest = false;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Unable to sign in.';
      });
  },
});

export const {continueAsGuest, logout, clearAuthError} = authSlice.actions;

export const selectIsSignedIn = state =>
  Boolean(state.auth.token) || state.auth.isGuest;

export default authSlice.reducer;

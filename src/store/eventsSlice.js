import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as api from '../api';

export const loadEvents = createAsyncThunk(
  'events/load',
  async (_, {getState, rejectWithValue}) => {
    try {
      const res = await api.fetchEvents(getState().auth.token);
      return res.data.events || [];
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadEvents.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(loadEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Unable to load events.';
      });
  },
});

export const selectEvents = state => state.events.items;

export default eventsSlice.reducer;

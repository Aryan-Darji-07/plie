import {createSlice} from '@reduxjs/toolkit';

// The API returns a shared event_id (216) across every row, so event_date_id is
// the only field that uniquely identifies a card. Keying on event_id would make
// one heart tap favorite all of them at once.
const initialState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite(state, action) {
      const event = action.payload;
      const index = state.items.findIndex(
        item => item.event_date_id === event.event_date_id,
      );
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(event);
      }
    },
    clearFavorites(state) {
      state.items = [];
    },
  },
});

export const {toggleFavorite, clearFavorites} = favoritesSlice.actions;

export const selectFavorites = state => state.favorites.items;
export const selectIsFavorite = eventDateId => state =>
  state.favorites.items.some(item => item.event_date_id === eventDateId);

export default favoritesSlice.reducer;

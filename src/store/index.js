import {combineReducers, configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import authReducer from './authSlice';
import eventsReducer from './eventsSlice';
import favoritesReducer from './favoritesSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  events: eventsReducer,
  favorites: favoritesReducer,
});

const persistedReducer = persistReducer(
  {
    key: 'plie-root',
    storage: AsyncStorage,
    whitelist: ['auth', 'favorites'],
  },
  rootReducer,
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

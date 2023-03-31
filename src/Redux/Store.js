import { configureStore } from '@reduxjs/toolkit';
import signupReducer from './AuthenticationSlice';
import EventsSlice from './EventsSlice';
const store = configureStore({
  reducer: {
    signup: signupReducer,
    events: EventsSlice,
  },
});

export default store;

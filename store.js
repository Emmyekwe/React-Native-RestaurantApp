import { configureStore } from '@reduxjs/toolkit';
import basketReducer from './features/basketSlice';
import restuarantReducer from './features/restuarantSlice';

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    restuarant: restuarantReducer,
},
})
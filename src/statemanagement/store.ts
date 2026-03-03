import { configureStore } from '@reduxjs/toolkit'
import loadReducer from './loadSlice';
import locationReducer from './latidutes';
import dialCastReducer from './dialyCast';
import hourlyforcastReducer from './hourlyForcast';
import windReducer from './windSpeeds';
import dataTypeReducer from './dataType';
import cityReducer from './city';
import errorReducer from './currentError'

export const store = configureStore({
  reducer: {
    load: loadReducer,
    location: locationReducer,
    dailCast: dialCastReducer,
    hourlyCast: hourlyforcastReducer,
    windSpeed: windReducer,
    dataType: dataTypeReducer,
    city: cityReducer,
    isTheAnError: errorReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
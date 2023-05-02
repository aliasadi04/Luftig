import { configureStore } from '@reduxjs/toolkit';

import { sensorReducer } from './sensor/sensor.reducer';
import { userReducer } from "./user/user.reducer";


export const store = configureStore({
    reducer: {
      user:userReducer,
      sensor:sensorReducer,
    }
  });

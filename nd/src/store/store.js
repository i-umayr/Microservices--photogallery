import { configureStore } from '@reduxjs/toolkit'
import NRCReducer from './slices/NRCSlice'
import UserReducer from "./slices/UserSlice"


export const store = configureStore({
  reducer: {
    nrcs:NRCReducer,
    users:UserReducer
  },
})
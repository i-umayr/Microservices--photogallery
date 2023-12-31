import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  userData:{
    userId: "",
    username: "",
    email: "",
    gallery: {
      images: [],
    },
    storage: {
      totalStorage: 10000,
      UsedStorage: 0,
      FreeStorage: 10000,
    },
    usage: {
      bandwidthTotalUsage: 0,
      bandwidthDailyUsage: 0,
      dailyLimit: 25000,
    },
  }
}

export const UserSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserData:(state,action)=>{
      state.userData=action.payload.userData
    }
  },
     
    
})

export const { setUserData } = UserSlice.actions

export default UserSlice.reducer
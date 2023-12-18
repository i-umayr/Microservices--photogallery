import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  userData:{
    _id:"",
    email:"",
    access:""
  }
}

export const UserSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserData:(state,action)=>{
        state.userData._id=action.payload._id
        state.userData.email=action.payload.email
        state.userData.access=action.payload.access
    }
  },
     
    
})

// Action creators are generated for each case reducer function
export const { setUserData } = UserSlice.actions

export default UserSlice.reducer
import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  NRC_Array:[],
  total_nrcs:0,
  filter_chars:""
}

export const NRCSlice = createSlice({
  name: 'nrcs',
  initialState,
  reducers: {
    replaceNRCList:(state,action)=>{
      state.NRC_Array=action.payload
    },
    updateFilter: (state,action) => {
      state.filter_chars=action.payload;
    }
    },
    
    
})

// Action creators are generated for each case reducer function
export const { updateFilter,replaceNRCList } = NRCSlice.actions

export default NRCSlice.reducer
import {createSlice} from '@reduxjs/toolkit';
const LoaderSlice = createSlice({
  name:'loading',
  initialState:false,
  reducers:{
    showLoading:()=>true,
    hideLoading:()=>false,
  }
  
});
export const {showLoading,hideLoading}= LoaderSlice.actions;
export default LoaderSlice.reducer;  

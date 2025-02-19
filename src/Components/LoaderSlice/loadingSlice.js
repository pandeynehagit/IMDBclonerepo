import {createSlice} from '@reduxjs/toolkit';
const loadingSlice = createSlice({
  name: "loading",
  initialState: { isLoading: false },
  reducers: {
    showLoading: (state) => {
      console.log("showloading working")
      state.isLoading = true;
    },
    hideLoading: (state) => {
      console.log("hideLoading working")
      state.isLoading = false;
    },
  },
});

export const {showLoading,hideLoading}= loadingSlice.actions;
export default loadingSlice.reducer;  

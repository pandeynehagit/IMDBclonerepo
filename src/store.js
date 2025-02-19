import {configureStore} from "@reduxjs/toolkit";
import LodingReducer from './Components/LoaderSlice/loadingSlice';

 const store = configureStore({
  reducer:{
    loading:LodingReducer
  }
});
export default store;
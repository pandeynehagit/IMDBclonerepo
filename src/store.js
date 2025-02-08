import {configureStore} from "@reduxjs/toolkit";
import LodingReducer from './Components/LoaderSlice/LoaderSlice';

 const store = configureStore({
  reducer:{
    loading:LodingReducer
  }
});
export default store;
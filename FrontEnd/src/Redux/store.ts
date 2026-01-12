import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Slices/Auth/slice"
const store = configureStore({
 reducer:{
   Auth:AuthSlice 
 }
})

export default store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
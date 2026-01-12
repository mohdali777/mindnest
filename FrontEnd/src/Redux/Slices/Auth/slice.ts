import { createSlice } from "@reduxjs/toolkit";
import type AuthInitialStateI from "./type";
import { login, logout, signup, verify } from "./reducers";

const initialState: AuthInitialStateI = {
_id: null,
user_name: null,
email: null,
image: null,
mood: null,
is_verify: null
};

const AuthSlice = createSlice({
name: "Auth",
initialState,
reducers: {
},
extraReducers: (builder) => {
builder
.addCase(login.fulfilled, (state, action) => {
state._id = action.payload._id;
state.user_name = action.payload.user_name;
state.email = action.payload.email;
state.image = action.payload.image;
state.mood = action.payload.mood;
state.is_verify = true;
})
.addCase(login.rejected, (state,) => {
state.is_verify = false;
})

.addCase(signup.fulfilled, (state, action) => {
state._id = action.payload._id;
state.user_name = action.payload.user_name;
state.email = action.payload.email;
state.image = action.payload.image;
state.mood = action.payload.mood;
state.is_verify = true;
})
.addCase(signup.rejected, (state,) => {
state.is_verify = false;
})

.addCase(verify.fulfilled, (state, action) => {
state._id = action.payload._id;
state.user_name = action.payload.user_name;
state.email = action.payload.email;
state.image = action.payload.image;
state.mood = action.payload.mood;
state.is_verify = true;
})
.addCase(verify.rejected, (state,) => {
state.is_verify = false;
})

.addCase(logout.fulfilled, (state,) => {
state._id = null;
state.user_name = null;
state.email = null;
state.image = null;
state.mood = null;
state.is_verify = false;
})

.addCase(logout.rejected, (state,) => {
state._id = null;
state.user_name = null;
state.email = null;
state.image = null;
state.mood = null;
state.is_verify = false;
})

}
});

export default AuthSlice.reducer;

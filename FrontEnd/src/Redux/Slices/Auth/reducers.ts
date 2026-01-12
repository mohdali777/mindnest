import { createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "../../../Api/loginaxios";
import { AxiosError } from "axios";
interface Response {
  _id: string;
  user_name: string;
  email: string;
  image: {
    image_url: string;
    public_id: string;
  };
  mood: string;
}
export const login = createAsyncThunk<
Response,
{ email: string; password: string },
{ rejectValue: string }
>("Auth/Login", async (payload, thunkAPI) => {
try {
const response = await axiosInstance.post("/auth/login", payload);
console.log("response==>",response.data);
const {_id,user_name,email,image,mood} = response.data;
return { _id,user_name,email,image,mood };
} catch (error) {
if (error instanceof AxiosError) {
return thunkAPI.rejectWithValue(
error.response?.data?.error || "Invalid credentials"
);
}
return thunkAPI.rejectWithValue("Login attempt failed. Please try again.");
}
});


export const signup = createAsyncThunk<
Response,
{ user_name:string,email: string; password: string },
{ rejectValue: string }
>("Auth/Signup", async (payload, thunkAPI) => {
try {
const response = await axiosInstance.post("/auth/signup", payload);
console.log("response==>",response.data);
const {_id,user_name,email,image,mood} = response.data;
return { _id,user_name,email,image,mood };
} catch (error) {
if (error instanceof AxiosError) {
return thunkAPI.rejectWithValue(
error.response?.data?.error || "Invalid credentials"
);
}
return thunkAPI.rejectWithValue("signup attempt failed. Please try again.");
}
});

export const logout = createAsyncThunk("Auth/logout", async (payload, thunkAPI) => {
try {
  await axiosInstance.post("/auth/logout", payload);
return
} catch (error) {
if (error instanceof AxiosError) {
return thunkAPI.rejectWithValue(
error.response?.data?.error || "Invalid credentials"
);
}
return thunkAPI.rejectWithValue("logout attempt failed. Please try again.");
}
});




export const verify = createAsyncThunk<
  Response,
  void,
  { rejectValue: string }
>(
  "Auth/Verify",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/auth/verifyuser");

      const { _id, user_name, email, image, mood } = response.data;

      return { _id, user_name, email, image, mood };
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.error || "Verification failed"
        );
      }
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);
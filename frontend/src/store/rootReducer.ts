import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import appSlice from "./slices/appSlice";
import userSlice from "./slices/userSlice";
import postSlice from "./slices/postSlice";
import clipSlice from "./slices/clipSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  app: appSlice,
  user: userSlice,
  post: postSlice,
  clip: clipSlice,
});

export default rootReducer;

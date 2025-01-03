import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import appSlice from "./slices/appSlice";
import userSlice from "./slices/userSlice";
import postSlice from "./slices/postSlice";
import clipSlice from "./slices/clipSlice";
import storySlice from "./slices/storySlice";
import chatSlice from "./slices/chatSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  app: appSlice,
  user: userSlice,
  post: postSlice,
  clip: clipSlice,
  story: storySlice,
  chat: chatSlice
});

export default rootReducer;

import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import appSlice from "./slices/appSlice";
import gallerSlice from "./slices/gallerySlice";
import userSlice from "./slices/userSlice";
import postSlice from "./slices/postSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  app: appSlice,
  gallery: gallerSlice,
  user: userSlice,
  post: postSlice
});

export default rootReducer;

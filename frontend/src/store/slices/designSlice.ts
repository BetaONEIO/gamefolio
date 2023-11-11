import { userData } from "@/data/responseData";
import { API } from "@/services/api";
import { APIParams, ActionParams } from "@/types/Api";
import { Credit, ImageResponse, UserData } from "@/types/ApiResponse";
import {
  getFromLocal,
  removeFromLocal,
  setToLocal,
} from "@/utils/localStorage";
import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "..";
import { PATH } from "@/constants/endpoints";

export type DesignType = {
  id: string;
  name: string;
  content: string;
  image_uri: string;
};

export type InitialState = {
  error: null;
  loading: boolean;
  designs: DesignType[] | [];
};

const initialState: InitialState = {
  error: null,
  loading: false,
  designs: [],
};

export const slice = createSlice({
  name: "design",
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    startLoading(state) {
      state.loading = true;
    },

    stopLoading(state) {
      state.loading = false;
    },
    getDesigns(state, action) {
      state.designs = action.payload;
    },
  },
});

export const { startLoading, stopLoading, getDesigns } = slice.actions;

export function getAllDesigns(params: ActionParams) {
  return async () => {
    const { successCallback = () => {}, errorCallback = () => {} } = params;

    dispatch(slice.actions.startLoading());

    const options: APIParams = {
      method: "GET",
      endpoint: PATH.design.root,
      payload: {},
    };
    try {
      const [ok, response] = await API(options);
      // console.log(response);
      if (!ok || !response) return errorCallback(response.message);
      successCallback(response.data);
      //   dispatch(slice.actions.getDesigns(response))
    } catch (error) {
      console.log("error", error);
      errorCallback();
    } finally {
      dispatch(slice.actions.stopLoading());
    }
  };
}

export default slice.reducer;

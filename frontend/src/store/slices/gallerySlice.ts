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

export type InitialState = {
  error: null;
  loading: boolean;
  gallery: ImageResponse[] | null;
};

const initialState: InitialState = {
  error: null,
  loading: false,
  gallery: null,
};

export const slice = createSlice({
  name: "gallery",
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
    getGallery(state, action) {
      state.gallery = action.payload;
    },
  },
});

export const { startLoading, stopLoading } = slice.actions;

export function generateCase(params: ActionParams) {
  return async () => {
    const {
      successCallback = () => {},
      errorCallback = () => {},
      payload,
    } = params;

    dispatch(slice.actions.startLoading());

    const options: APIParams = {
      method: "POST",
      endpoint: PATH.theNextLeg.imagine,
      payload: payload,
      isToken: true,
    };
    try {
      const [ok, response] = await API(options);
      if (!ok || !response) return errorCallback(response.message);

      successCallback(response);
    } catch (error) {
      errorCallback();
    } finally {
      dispatch(slice.actions.stopLoading());
    }
  };
}

export function updateImageContent(params: ActionParams) {
  return async () => {
    const {
      successCallback = () => {},
      errorCallback = () => {},
      messageId,
      payload,
    } = params;

    dispatch(slice.actions.startLoading());

    const options: APIParams = {
      method: "PATCH",
      endpoint: `the-next-leg/${messageId}`,
      payload: payload,
      isToken: true,
    };
    try {
      const [ok, response] = await API(options);
      if (!ok || !response) return errorCallback(response.message);
      console.log("Update Response ===>", response);
      successCallback(response);
    } catch (error) {
      errorCallback();
    } finally {
      dispatch(slice.actions.stopLoading());
    }
  };
}

export function getAllImagesByUser(params: ActionParams) {
  return async () => {
    const {
      successCallback = () => {},
      errorCallback = () => {},
      page,
    } = params;
    dispatch(slice.actions.startLoading());
    console.log("PAGE ===> ", page);
    const options: APIParams = {
      method: "GET",
      endpoint: `${PATH.theNextLeg.root}?page=${page}&limit=2`,
      payload: {},
      isToken: true,
    };

    try {
      const [ok, response] = await API(options);
      if (!ok || !response) return errorCallback();
      console.log("ALL IMAGES ===>", response);
      successCallback(response.data);
      dispatch(slice.actions.getGallery(response.data.items));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(slice.actions.stopLoading());
    }
  };
}

export default slice.reducer;

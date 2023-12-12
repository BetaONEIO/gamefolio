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
  chat: any; //
  messages:  Array<any>;
  token: string;
  userCredits: Credit | null;
  gallery: ImageResponse[] | null;
  videos: Array<any>;
  allMusic: Array<any>;
  refresh: boolean;
};

const initialState: InitialState = {
  error: null,
  loading: false,
  chat:{},
  messages: [],
  token: "",
  userCredits: null,
  gallery: null,
  videos: [],
  allMusic: [],
  refresh: false,
};

export const slice = createSlice({
  name: "post",
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
    // getUser(state, action) {
    //   state.userData = action.payload;
    // },
    getToken(state, action) {
      state.token = action.payload;
    },
    getCredits(state, action) {
      state.userCredits = action.payload;
    },
    getGallery(state, action) {
      state.gallery = action.payload;
    },
    getAllPostVideos(state, action) {
      state.videos = action.payload;
    },
    getAllMusic(state, action) {
      state.allMusic = action.payload;
    },
    getAllMessages(state, action) {
      state.messages = action.payload;
    },
    refreshPage(state) {
      state.refresh = state.refresh ? false : true;
    },
    setSelectedChat(state, action) {
      state.chat = action.payload;
    },
    updateSelectedChat(state, action) {
      console.log("state.chat: ", state)
      // state.chat.push(action.payload);
      state.chat.messages = [...state.chat.messages, action.payload];
    }
  },
});

export const { startLoading, stopLoading, getCredits, refreshPage, getAllMessages, setSelectedChat, updateSelectedChat } =
  slice.actions;

export function initChat(params: ActionParams) {
  return async () => {
    const {
      successCallback = () => {},
      errorCallback = () => {},
      payload,
    } = params;

    dispatch(slice.actions.startLoading());

    const options: APIParams = {
      method: "POST",
      endpoint: PATH.chat.init,
      payload: payload,
      isToken: false,
    };
    try {
      const [ok, response] = await API(options);
      console.log("response chatslice: ", response)
      if (!ok || !response) return errorCallback(response.message);

      successCallback(response.message);
      dispatch(slice.actions.getAllMessages(response.data));
    } catch (error) {
      console.log("error", error);
      errorCallback(error);
    } finally {
      dispatch(slice.actions.stopLoading());
    }
  };
}
export function getUserMessages(params: ActionParams) {
  return async () => {
    const {
      successCallback = () => {},
      errorCallback = () => {},
      payload,
    } = params;

    console.log("payload chatSlice.ts: ", payload)

    dispatch(slice.actions.startLoading());

    const options: APIParams = {
      method: "POST",
      endpoint: PATH.chat.getUserMessages,
      payload: payload,
      isToken: false,
    };
    try {
      const [ok, response] = await API(options);
      console.log("response chatslice: ", response)
      if (!ok || !response) return errorCallback(response.message);

      successCallback(response.message);
      dispatch(slice.actions.getAllMessages(response.data));
    } catch (error) {
      console.log("error", error);
      errorCallback(error);
    } finally {
      dispatch(slice.actions.stopLoading());
    }
  };
}

// export function getAllPostVideos() {
//   return async () => {
//     dispatch(slice.actions.startLoading());

//     const options: APIParams = {
//       method: "GET",
//       endpoint: PATH.post.get,
//       payload: {},
//       isToken: false,
//     };

//     try {
//       const [ok, response] = await API(options);

//       dispatch(slice.actions.getAllPostVideos(response.data));
//     } catch (error) {
//       console.log(error);
//     } finally {
//       dispatch(slice.actions.stopLoading());
//     }
//   };
// }



export default slice.reducer;

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
  userData: UserData | null;
  token: string;
  userCredits: Credit | null;
  gallery: ImageResponse[] | null;
};

const initialState: InitialState = {
  error: null,
  loading: false,
  userData: null,
  token: "",
  userCredits: null,
  gallery: null,
};

export const slice = createSlice({
  name: "auth",
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
    getUser(state, action) {
      state.userData = action.payload;
    },
    getToken(state, action) {
      state.token = action.payload;
    },
    getCredits(state, action) {
      state.userCredits = action.payload;
    },
    getGallery(state, action) {
      state.gallery = action.payload;
    },
  },
});

export const { startLoading, stopLoading, getCredits } = slice.actions;

export function register(params: ActionParams) {
  return async () => {
    const {
      successCallback = () => {},
      errorCallback = () => {},
      payload,
    } = params;

    console.log("))) 00: ", payload);

    dispatch(slice.actions.startLoading());

    const options: APIParams = {
      method: "POST",
      endpoint: PATH.auth.register,
      payload: payload,
      isToken: false,
    };
    try {
      const [ok, response] = await API(options);
      console.log(response);
      if (!ok || !response) return errorCallback(response.message);

      console.log("repsonse:::: ", response);

      successCallback(response.message);
    } catch (error) {
      console.log("error", error);
      errorCallback();
    } finally {
      dispatch(slice.actions.stopLoading());
    }
  };
}

export function login(params: ActionParams) {
  return async () => {
    const {
      successCallback = () => {},
      errorCallback = () => {},
      payload,
    } = params;

    dispatch(slice.actions.startLoading());

    const options: APIParams = {
      method: "POST",
      endpoint: PATH.auth.login,
      payload: payload,
      isToken: false,
    };

    try {
      const [ok, response] = await API(options);
      console.log("this is response login authslice: ", response);
      console.log("this is response", ok);

      if (!ok && response.message)
        if (!ok || !response) return errorCallback(response.message);

      if (response) {
        // Use the correct key for the token in your response
        setToLocal("@token", response.token);
        setToLocal("@userData", response);
        dispatch(slice.actions.getUser(response));
        dispatch(slice.actions.getToken(response.token));
      }

      successCallback(response);
    } catch (error) {
      if (error) return errorCallback("Please check your internet");
      if (error) console.log(error);
    } finally {
      dispatch(slice.actions.stopLoading());
    }
  };
}
export function createPreferences(params: ActionParams) {
  const {
    successCallback = () => {},
    errorCallback = () => {},
    payload,
  } = params;
  return async () => {
  

    dispatch(slice.actions.startLoading());

    const options: APIParams = {
      method: "POST",
      endpoint: PATH.user.preferences,
      payload: payload,
      isToken: false,
    };
    try {
      const [ok, response] = await API(options);
      console.log(response);
      if (!ok || !response) return errorCallback(response.message);

      console.log("repsonse:::: ",response );

      successCallback(response.message);
    } catch (error) {
      console.log("error", error);
      errorCallback();
    } finally {
      dispatch(slice.actions.stopLoading());
    }
  };
}
export function updateProfile(params: ActionParams) {
  const {
    successCallback = () => {},
    errorCallback = () => {},
    payload,
  } = params;
  return async () => {
  

    dispatch(slice.actions.startLoading());

    const options: APIParams = {
      method: "PUT",
      endpoint: PATH.user.updateProfile,
      payload: payload,
      isToken: false,
    };
    try {
      const [ok, response] = await API(options);
      console.log(response);
      if (!ok || !response) return errorCallback(response.message);

      console.log("repsonse:::: ",response );

      successCallback(response.message);
    } catch (error) {
      console.log("error", error);
      errorCallback();
    } finally {
      dispatch(slice.actions.stopLoading());
    }
  };
}
export function updatePassword(params: ActionParams) {
  const {
    successCallback = () => {},
    errorCallback = () => {},
    payload,
  } = params;
  return async () => {
  

    dispatch(slice.actions.startLoading());

    const options: APIParams = {
      method: "PUT",
      endpoint: PATH.user.updatePassword,
      payload: payload,
      isToken: false,
    };
    try {
      const [ok, response] = await API(options);
      if (!ok || !response) return errorCallback(response.message);
      console.log("update password response: ", response.message);
      successCallback(response.message);
    } catch (error) {
      console.log("error", error);
      errorCallback();
    } finally {
      dispatch(slice.actions.stopLoading());
    }
  };
}

export function createFavoriteGame(params: ActionParams) {
  const {
    successCallback = () => {},
    errorCallback = () => {},
    payload,
  } = params;
  return async () => {
  

    dispatch(slice.actions.startLoading());

    const options: APIParams = {
      method: "POST",
      endpoint: PATH.user.favoritegame,
      payload: payload,
      isToken: false,
    };
    try {
      const [ok, response] = await API(options);
      console.log(response);
      if (!ok || !response) return errorCallback(response.message);

      console.log("repsonse:::: ",response );

      successCallback(response.message);
    } catch (error) {
      console.log("error", error);
      errorCallback();
    } finally {
      dispatch(slice.actions.stopLoading());
    }
  };
}

export function logout(params: ActionParams) {
  return async () => {
    const { successCallback = () => {}, errorCallback = () => {} } = params;

    dispatch(slice.actions.startLoading());

    const options: APIParams = {
      method: "POST",
      endpoint: PATH.auth.logout,
      payload: {},
    };

    try {
      const [ok, response] = await API(options);
      // console.log(response);
      if (!ok || !response) return errorCallback(response.message);

      if (ok || response) {
        // console.log(ok, response);
        removeFromLocal("@token");
        removeFromLocal("@userData");
        dispatch(slice.actions.getUser(null));
        dispatch(slice.actions.getToken(""));
      }

      successCallback(response);
    } catch (error) {
      if (error) console.log(error);
    } finally {
      dispatch(slice.actions.stopLoading());
    }
  };
}

export function resetPassword(params: ActionParams) {
  return async () => {
    const {
      successCallback = () => {},
      errorCallback = () => {},
      payload,
      token,
    } = params;
    dispatch(slice.actions.startLoading());

    const options: APIParams = {
      method: "POST",
      endpoint: `${PATH.auth.resetPasswordByVerfToken}/${token}`,
      payload: payload,
      isToken: false,
    };
    try {
      const [ok, response] = await API(options);
      // console.log(response);
      if (!ok || !response) return errorCallback(response.message);

      successCallback(response.message);
    } catch (error) {
    } finally {
      dispatch(slice.actions.stopLoading());
    }
  };
}

export function forgotPassword(params: ActionParams) {
  return async () => {
    const {
      successCallback = () => {},
      errorCallback = () => {},
      payload,
    } = params;

    console.log(payload);
    dispatch(slice.actions.startLoading());
    const options: APIParams = {
      method: "POST",
      endpoint: PATH.auth.forgotPassword,
      payload: payload,
      isToken: false,
    };
    try {
      const [ok, response] = await API(options);
      // console.log(response);
      if (!ok || !response) return errorCallback(response.message);

      successCallback(response);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(slice.actions.stopLoading());
    }
  };
}

export function onVerifyLink(params: ActionParams) {
  return async () => {
    const {
      successCallback = () => {},
      errorCallback = () => {},
      payload,
    } = params;

    dispatch(slice.actions.startLoading());

    const options: APIParams = {
      method: "POST",
      endpoint: PATH.auth.verifyEmail,
      payload: payload,
      isToken: false,
    };
    try {
      const [ok, response] = await API(options);
      if (!ok || !response) return errorCallback(response.message);

      successCallback(response.messgae);

      setToLocal("@token", response.token);
      setToLocal("@userData", response.data);
      dispatch(slice.actions.getUser(response.data));
      dispatch(slice.actions.getToken(response.token));
    } catch (error) {
      errorCallback();
    } finally {
      dispatch(slice.actions.stopLoading());
    }
  };
}

export function userSession(params: ActionParams) {
  return async () => {

    const {
      payload,
    } = params;
    dispatch(slice.actions.startLoading());

    console.log("payload:", payload)

    const options: APIParams = {
      method: "POST",
      endpoint: PATH.user.getUser,
      payload: payload,
      isToken: true,
    };
    try {
      const [ok, response] = await API(options);
      if (!ok || !response) {
        const userData = getFromLocal("@userData");
        dispatch(slice.actions.getUser(userData));
      } else {
        console.log("GET USER ===>", response);
        setToLocal("@userData", response);
      
        dispatch(slice.actions.getUser(response));
      }
      const token = getFromLocal("@token");
      dispatch(slice.actions.getToken(token));
      dispatch(slice.actions.getCredits(response.credit));
    } catch (error) {
    } finally {
      dispatch(slice.actions.stopLoading());
    }
  };
}

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

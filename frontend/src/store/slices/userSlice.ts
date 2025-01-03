import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "..";
import { API } from "@/services/api";
import { APIParams, ActionParams } from "@/types/Api";
import { PATH } from "@/constants/endpoints";

export type InitialState = {
  error: null;
  loading: boolean;
  profileUserInfo?: any;
  userList?: any;
  profile?: any;
  refresh: boolean;
};

const initialState: InitialState = {
  error: null,
  loading: true,
  profileUserInfo: {},
  userList: [],
  profile: null,
  refresh: false,
};

export const slice = createSlice({
  name: "user",
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
    setUsers(state, action) {
      state.userList = action.payload.users;
    },
    getAllUsers(state, action) {
      state.userList = action.payload;
    },
    setProfile(state, action) {
      state.profile = action.payload.result;
    },
    setSearchUserInfo(state, action) {
      state.profileUserInfo = action.payload;
    },
    refreshPage(state) {
      state.refresh = state.refresh ? false : true;
    },
  },
});

export const { refreshPage } = slice.actions;

export function getUser(params: ActionParams) {
  return async () => {
    const {
      successCallback = () => {},
      errorCallback = () => {},
      paramspayload,
    }: any = params;

    const options: APIParams = {
      method: "GET",
      endpoint: PATH.user.getUser,
      isToken: false,
      payload: {},
    };

    try {
      const [ok, response] = await API(options);
      if (!ok || !response) return;
      dispatch(slice.actions.setProfile(response));
      successCallback();
    } catch (error) {
    } finally {
      dispatch(slice.actions.stopLoading());
    }
  };
}

export function getAllUsers() {
  return async () => {
    dispatch(slice.actions.startLoading());
    const options: APIParams = {
      method: "GET",
      endpoint: PATH.user.getAllUsers,
      payload: {},
      isToken: false,
    };

    try {
      const [ok, response] = await API(options);
      dispatch(slice.actions.getAllUsers(response.data));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(slice.actions.stopLoading());
    }
  };
}

export function postUsernames(params: ActionParams) {
  return async () => {
    const {
      successCallback = () => {},
      errorCallback = () => {},
      payload,
    } = params;

    dispatch(slice.actions.startLoading());

    const options: APIParams = {
      method: "POST",
      endpoint: PATH.user.createUsernames,
      payload: payload,
      isToken: false,
    };
    try {
      const [ok, response] = await API(options);
      if (!ok || !response) return errorCallback(response.message);

      successCallback(response.message);
    } catch (error) {
      errorCallback();
    } finally {
      dispatch(slice.actions.stopLoading());
    }
  };
}

export function getProfileInfo(params: ActionParams) {
  return async () => {
    const { payload }: any = params;
    dispatch(slice.actions.startLoading());

    const options: APIParams = {
      method: "POST",
      endpoint: PATH.user.getProfileInfo,
      isToken: true,
      payload: payload,
    };

    try {
      const [ok, response] = await API(options);
      if (!ok || !response) return;

      dispatch(slice.actions.setSearchUserInfo(response));
    } catch (error) {
    } finally {
      dispatch(slice.actions.stopLoading());
    }
  };
}

export function followUser(params: ActionParams) {
  return async () => {
    const {
      successCallback = () => {},
      errorCallback = () => {},
      payload,
    } = params;

    dispatch(slice.actions.startLoading());

    const options: APIParams = {
      method: "POST",
      endpoint: PATH.user.followUser,
      isToken: false,
      payload,
    };

    try {
      const [ok, response] = await API(options);
      if (!ok || !response) return errorCallback(response.message);
      successCallback(response);
    } catch (error) {
      errorCallback(error);
    } finally {
      dispatch(slice.actions.stopLoading());
    }
  };
}

export function removeFollow(params: ActionParams) {
  return async () => {
    const {
      successCallback = () => {},
      errorCallback = () => {},
      payload,
    } = params;

    dispatch(slice.actions.startLoading());

    const options: APIParams = {
      method: "POST",
      endpoint: PATH.user.removeFollow,
      isToken: false,
      payload,
    };

    try {
      const [ok, response] = await API(options);
      if (!ok || !response) return errorCallback(response.message);
      successCallback(response);
    } catch (error) {
      errorCallback(error);
    } finally {
      dispatch(slice.actions.stopLoading());
    }
  };
}

export function removeFollowing(params: ActionParams) {
  return async () => {
    const {
      successCallback = () => {},
      errorCallback = () => {},
      payload,
    } = params;

    dispatch(slice.actions.startLoading());

    const options: APIParams = {
      method: "POST",
      endpoint: PATH.user.removeFollowing,
      isToken: false,
      payload,
    };

    try {
      const [ok, response] = await API(options);
      if (!ok || !response) return errorCallback(response.message);
      successCallback(response);
    } catch (error) {
      errorCallback(error);
    } finally {
      dispatch(slice.actions.stopLoading());
    }
  };
}

export function createNotification(params: ActionParams) {
  return async () => {
    const {
      successCallback = () => {},
      errorCallback = () => {},
      payload,
    } = params;

    dispatch(slice.actions.startLoading());

    const options: APIParams = {
      method: "POST",
      endpoint: PATH.user.notification,
      isToken: false,
      payload,
    };

    try {
      const [ok, response] = await API(options);
      if (!ok || !response) return errorCallback(response.message);
      successCallback(response);
    } catch (error) {
      errorCallback(error);
    } finally {
      dispatch(slice.actions.stopLoading());
    }
  };
}

export function updateNotification(params: ActionParams) {
  return async () => {
    const {
      successCallback = () => {},
      errorCallback = () => {},
      payload,
    } = params;

    dispatch(slice.actions.startLoading());

    const options: APIParams = {
      method: "PUT",
      endpoint: PATH.user.updateNotification,
      isToken: false,
      payload,
    };

    try {
      const [ok, response] = await API(options);
      if (!ok || !response) return errorCallback(response.message);
      successCallback(response);
    } catch (error) {
      errorCallback(error);
    } finally {
      dispatch(slice.actions.stopLoading());
    }
  };
}

export function getNotification(params: ActionParams) {
  return async () => {
    const {
      successCallback = () => {},
      errorCallback = () => {},
      payload,
    } = params;

    dispatch(slice.actions.startLoading());

    const options: APIParams = {
      method: "POST",
      endpoint: PATH.user.getNotification,
      isToken: false,
      payload,
    };

    try {
      const [ok, response] = await API(options);
      if (!ok || !response) return errorCallback(response.message);
      successCallback(response);
    } catch (error) {
      errorCallback(error);
    } finally {
      dispatch(slice.actions.stopLoading());
    }
  };
}

export function blockUser(params: ActionParams) {
  return async () => {
    const {
      successCallback = () => {},
      errorCallback = () => {},
      payload,
    } = params;

    dispatch(slice.actions.startLoading());

    const options: APIParams = {
      method: "POST",
      endpoint: PATH.user.blockUser,
      isToken: false,
      payload,
    };

    try {
      const [ok, response] = await API(options);
      if (!ok || !response) return errorCallback(response.message);
      successCallback(response);
    } catch (error) {
      errorCallback(error);
    } finally {
      dispatch(slice.actions.stopLoading());
    }
  };
}

export function unBlockUser(params: ActionParams) {
  return async () => {
    const {
      successCallback = () => {},
      errorCallback = () => {},
      payload,
    } = params;

    dispatch(slice.actions.startLoading());

    const options: APIParams = {
      method: "POST",
      endpoint: PATH.user.unBlockUser,
      isToken: false,
      payload,
    };

    try {
      const [ok, response] = await API(options);
      if (!ok || !response) return errorCallback(response.message);
      successCallback(response);
    } catch (error) {
      errorCallback(error);
    } finally {
      dispatch(slice.actions.stopLoading());
    }
  };
}

export function deactivateAccount(params: ActionParams) {
  return async () => {
    const {
      successCallback = () => {},
      errorCallback = () => {},
      payload,
    } = params;

    dispatch(slice.actions.startLoading());

    const options: APIParams = {
      method: "POST",
      endpoint: PATH.user.deactiveAccount,
      isToken: false,
      payload,
    };

    try {
      const [ok, response] = await API(options);
      if (!ok || !response) return errorCallback(response.message);
      successCallback(response.message);
    } catch (error) {
      errorCallback(error);
    } finally {
      dispatch(slice.actions.stopLoading());
    }
  };
}

export function updateTutorial(params: ActionParams) {
  return async () => {
    const {
      successCallback = () => {},
      errorCallback = () => {},
      payload,
    } = params;

    dispatch(slice.actions.startLoading());

    const options: APIParams = {
      method: "GET",
      endpoint: "users",
      isToken: false,
      payload,
    };

    try {
      const [ok, response] = await API(options);
      if (!ok || !response) return;

      successCallback();
    } catch (error) {
    } finally {
      dispatch(slice.actions.stopLoading());
    }
  };
}

export function addUser(params: ActionParams) {
  return async () => {
    const {
      successCallback = () => {},
      errorCallback = () => {},
      payload,
    } = params;

    dispatch(slice.actions.startLoading());

    const options: APIParams = {
      method: "POST",
      endpoint: "users/create",
      isToken: false,
      payload,
    };

    try {
      const [ok, response] = await API(options);
      if (!ok || !response) return;
      successCallback(response);
    } catch (error) {
    } finally {
      dispatch(slice.actions.stopLoading());
    }
  };
}

export function reportUser(params: ActionParams) {
  const {
    successCallback = () => {},
    errorCallback = () => {},
    payload,
  } = params;
  return async () => {
    dispatch(slice.actions.startLoading());

    const options: APIParams = {
      method: "POST",
      endpoint: PATH.user.reportUser,
      payload: payload,
      isToken: false,
    };
    try {
      const [ok, response] = await API(options);
      if (!ok || !response) return errorCallback(response.message);

      successCallback(response.message);
    } catch (error) {
      errorCallback();
    } finally {
      dispatch(slice.actions.stopLoading());
    }
  };
}

export function getSingleUser(params: ActionParams) {
  return async () => {
    const {
      successCallback = () => {},
      errorCallback = () => {},
      paramspayload,
    }: any = params;

    const options: APIParams = {
      method: "GET",
      endpoint: `users/userById?id=${paramspayload?.id}`,
      isToken: false,
      payload: {},
    };

    try {
      const [ok, response] = await API(options);
      if (!ok || !response) return;
      dispatch(slice.actions.setProfile(response));
      successCallback();
    } catch (error) {
    } finally {
      dispatch(slice.actions.stopLoading());
    }
  };
}

export function getOtherUser(params: ActionParams) {
  return async () => {
    const {
      successCallback = () => {},
      errorCallback = () => {},
      payload,
    }: any = params;

    dispatch(slice.actions.startLoading());
    const options: APIParams = {
      method: "GET",
      endpoint: `users/userById?id=${payload?.id}&otherid=${payload?.otherid}`,
      isToken: false,
      payload: {},
    };

    try {
      const [ok, response] = await API(options);
      if (!ok || !response) return;
      successCallback(response);
    } catch (error) {
    } finally {
      dispatch(slice.actions.stopLoading());
    }
  };
}

export function updateUser(params: ActionParams) {
  return async () => {
    const {
      successCallback = () => {},
      errorCallback = () => {},
      payload,
    } = params;

    dispatch(slice.actions.startLoading());

    const options: APIParams = {
      method: "POST",
      endpoint: "users/updateUser",
      isToken: false,
      payload,
    };

    let paramspayload: any = { id: payload };
    try {
      const [ok, response] = await API(options);
      if (!ok || !response) return;
      successCallback(response);
      let params: any = {
        paramspayload,
      };
      dispatch(getSingleUser(params));
    } catch (error) {
    } finally {
      dispatch(slice.actions.stopLoading());
    }
  };
}

export default slice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "..";
import { API } from "@/services/api";
import { APIParams, ActionParams } from "@/types/Api";
import { PATH } from "@/constants/endpoints";

export type InitialState = {
  error: null;
  loading: boolean;
  userList?: any;
  profile?: any;
};

const initialState: InitialState = {
  error: null,
  loading: false,
  userList: [],
  profile: null,
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
      state.userList = action.payload.users;
    },
    setProfile(state, action) {
      state.profile = action.payload.result;
    },
  },
});

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
      console.log("all users", response.data);
      dispatch(slice.actions.getAllUsers(response.data));
    } catch (error) {
      console.log(error);
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
      endpoint: "users/manageFollows",
      isToken: false,
      payload,
    };

    try {
      const [ok, response] = await API(options);
      if (!ok || !response) return;
      let paramspayload: any = { id: payload };
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

// export function getAllUsers(params: ActionParams) {
//   return async () => {
//     const { successCallback = () => {}, errorCallback = () => {} } = params;

//     dispatch(slice.actions.startLoading());

//     const options: APIParams = {
//       method: "GET",
//       endpoint: "users/allUsers",
//       isToken: false,
//       payload: {},
//     };

//     try {
//       const [ok, response] = await API(options);
//       if (!ok || !response) return;

//       dispatch(slice.actions.setUsers(response));
//       successCallback(response);
//     } catch (error) {
//     } finally {
//       dispatch(slice.actions.stopLoading());
//     }
//   };
// }

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

import { PATH } from "@/constants/endpoints";
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

export type InitialState = {
  error: null;
  loading: boolean;
  userData: UserData | null;
  token: string;
  userCredits: Credit | null;
  gallery: ImageResponse[] | null;
  videos: Array<any>;
  postID: String;
  detailedPost: Object;
  comments: Array<any>;
  trendingVideos: Array<any>;
  followingVideos: Array<any>;
  bookmarks: Array<any>;
  allMusic: Array<any>;
  refresh: boolean;
  initialLoading: boolean;
  customVideo: Array<any>;

  hasNextPage: boolean;
};

const initialState: InitialState = {
  error: null,
  loading: true,
  userData: null,
  token: "",
  userCredits: null,
  gallery: null,
  videos: [],
  postID: "",
  detailedPost: {},
  comments: [],
  trendingVideos: [],
  bookmarks: [],
  allMusic: [],
  refresh: false,
  followingVideos: [],
  customVideo: [],
  initialLoading: true,
  hasNextPage: false,
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

    setNextPage(state, action) {
      state.hasNextPage = action.payload;
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
    getAllPostVideos(state, action) {
      state.videos = action.payload;
    },
    updatePostID(state, action) {
      state.postID = action.payload;
    },
    updateDetailedPost(state, action) {
      state.detailedPost = action.payload;
    },
    getTrendingPosts(state, action) {
      state.trendingVideos = action.payload;
    },
    getFollowingPost(state, action) {
      const existingIds = new Set(
        state.followingVideos.map((video) => video._id)
      );

      const uniqueVideos = action.payload.reduce(
        (acc: Array<string>, video: any) => {
          if (!existingIds.has(video._id)) {
            existingIds.add(video._id);
            acc.push(video);
          }
          return acc;
        },
        []
      );

      state.followingVideos = [...state.followingVideos, ...uniqueVideos];
      state.initialLoading = false;
    },

    getUserBookmarks(state, action) {
      state.bookmarks = action.payload;
    },
    getAllMusic(state, action) {
      state.allMusic = action.payload;
    },
    refreshPage(state) {
      state.refresh = state.refresh ? false : true;
    },
    setCustomVideoURL(state, action) {
      state.customVideo = action.payload;
    },
  },
});

export const {
  startLoading,
  stopLoading,
  getCredits,
  refreshPage,
  updatePostID,
  updateDetailedPost,
  setCustomVideoURL,
} = slice.actions;

export function postVideo(params: ActionParams) {
  return async () => {
    const {
      successCallback = () => {},
      errorCallback = () => {},
      payload,
    } = params;

    dispatch(slice.actions.startLoading());

    const options: APIParams = {
      method: "POST",
      endpoint: PATH.post.create,
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

export function getVideoLink(params: ActionParams) {
  return async () => {
    const {
      successCallback = () => {},
      errorCallback = () => {},
      payload,
    } = params;

    dispatch(slice.actions.startLoading());

    const options: APIParams = {
      method: "POST",
      endpoint: PATH.post.getVideoLink,
      payload: payload,
      isToken: false,
    };
    try {
      const [ok, response] = await API(options);
      if (!ok || !response) return errorCallback(response.message);

      successCallback(response.message);
      dispatch(slice.actions.setCustomVideoURL(response.data));
    } catch (error) {
      errorCallback();
    } finally {
      dispatch(slice.actions.stopLoading());
    }
  };
}

export function getAllPostVideos() {
  return async () => {
    dispatch(slice.actions.startLoading());

    const options: APIParams = {
      method: "GET",
      endpoint: PATH.post.get,
      payload: {},
      isToken: false,
    };

    try {
      const [ok, response] = await API(options);

      dispatch(slice.actions.getAllPostVideos(response.data));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(slice.actions.stopLoading());
    }
  };
}

export function getUpdatedDetailedPost(params: ActionParams) {
  return async () => {
    const { payload } = params;
    dispatch(slice.actions.startLoading());

    const options: APIParams = {
      method: "POST",
      endpoint: PATH.post.getUpdatedComments,
      payload: payload,
      isToken: true,
    };

    try {
      const [ok, response] = await API(options);

      dispatch(slice.actions.updateDetailedPost(response.data));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(slice.actions.stopLoading());
    }
  };
}

export function getTrendingPosts() {
  return async () => {
    dispatch(slice.actions.startLoading());

    const options: APIParams = {
      method: "GET",
      endpoint: PATH.post.getTrendingPosts,
      payload: {},
      isToken: false,
    };

    try {
      const [ok, response] = await API(options);
      dispatch(slice.actions.getTrendingPosts(response.data));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(slice.actions.stopLoading());
    }
  };
}

export function getFollowingPostOnly(params: ActionParams) {
  return async () => {
    const { payload } = params;

    dispatch(slice.actions.startLoading());

    const options: APIParams = {
      method: "POST",
      endpoint: PATH.post.getFollowingPosts,
      payload: payload,
      isToken: false,
    };
    try {
      const [ok, response] = await API(options);

      dispatch(slice.actions.getFollowingPost(response.data));

      dispatch(slice.actions.setNextPage(response.hasNextPage));
      dispatch(slice.actions.stopLoading());
    } catch (error) {
      console.log("error: ", error);
    }
  };
}

export function deleteVideo(params: ActionParams) {
  return async () => {
    const {
      successCallback = () => {},
      errorCallback = () => {},
      payload,
    } = params;

    dispatch(slice.actions.startLoading());

    const options: APIParams = {
      method: "POST",
      endpoint: PATH.post.delete,
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

export function getAllMusic() {
  return async () => {
    dispatch(slice.actions.startLoading());

    const options: APIParams = {
      method: "GET",
      endpoint: PATH.music.getAllMusic,
      payload: {},
      isToken: false,
    };

    try {
      const [ok, response] = await API(options);

      dispatch(slice.actions.getAllMusic(response.data));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(slice.actions.stopLoading());
    }
  };
}

//create reaction
export function createVideoReaction(params: ActionParams) {
  return async () => {
    const {
      successCallback = () => {},
      errorCallback = () => {},
      payload,
    } = params;

    dispatch(slice.actions.startLoading());

    const options: APIParams = {
      method: "POST",
      endpoint: PATH.reaction.create,
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

//delete reaction
export function deleteVideoReaction(params: ActionParams) {
  return async () => {
    const {
      successCallback = () => {},
      errorCallback = () => {},
      payload,
    } = params;

    dispatch(slice.actions.startLoading());

    const options: APIParams = {
      method: "POST",
      endpoint: PATH.reaction.delete,
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

export function createComment(params: ActionParams) {
  return async () => {
    const {
      successCallback = () => {},
      errorCallback = () => {},
      payload,
    } = params;

    dispatch(slice.actions.startLoading());

    const options: APIParams = {
      method: "POST",
      endpoint: PATH.comment.create,
      payload: payload,
      isToken: false,
    };
    try {
      const [ok, response] = await API(options);

      if (!ok || !response) return errorCallback(response.message);
      successCallback(response.message);
      dispatch(slice.actions.updateDetailedPost(response.data));
    } catch (error) {
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

      if (!ok && response.message)
        if (!ok || !response) return errorCallback(response.message);

      if (response) {
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
      if (!ok || !response) return errorCallback(response.message);

      if (ok || response) {
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

// Bookmark
export function createBookmark(params: ActionParams) {
  return async () => {
    const {
      successCallback = () => {},
      errorCallback = () => {},
      payload,
    } = params;
    dispatch(slice.actions.startLoading());

    const options: APIParams = {
      method: "POST",
      endpoint: PATH.bookmark.create,
      payload: payload,
      isToken: false,
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

export function getUserBookmark(params: ActionParams) {
  return async () => {
    const { errorCallback = () => {}, payload } = params;
    dispatch(slice.actions.startLoading());

    const options: APIParams = {
      method: "POST",
      endpoint: PATH.bookmark.get,
      payload: payload,
      isToken: false,
    };

    try {
      const [ok, response] = await API(options);
      if (!ok || !response) return errorCallback(response.message);

      dispatch(slice.actions.getUserBookmarks(response.data));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(slice.actions.stopLoading());
    }
  };
}

export function removeUserBookmark(params: ActionParams) {
  return async () => {
    const {
      successCallback = () => {},
      errorCallback = () => {},
      payload,
    } = params;
    dispatch(slice.actions.startLoading());

    const options: APIParams = {
      method: "DELETE",
      endpoint: PATH.bookmark.remove,
      payload: payload,
      isToken: false,
    };

    try {
      const [ok, response] = await API(options);
      if (!ok || !response) return errorCallback(response.message);
      successCallback(response.message);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(slice.actions.stopLoading());
    }
  };
}

export function userSession() {
  return async () => {
    dispatch(slice.actions.startLoading());

    const options: APIParams = {
      method: "GET",
      endpoint: PATH.user.getUser,
      payload: {},
      isToken: true,
    };
    try {
      const [ok, response] = await API(options);
      if (!ok || !response) {
        const userData = getFromLocal("@userData");
        dispatch(slice.actions.getUser(userData));
      } else {
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
    const options: APIParams = {
      method: "GET",
      endpoint: `${PATH.theNextLeg.root}?page=${page}&limit=2`,
      payload: {},
      isToken: true,
    };

    try {
      const [ok, response] = await API(options);
      if (!ok || !response) return errorCallback();
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

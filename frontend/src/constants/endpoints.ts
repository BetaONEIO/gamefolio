export const PATH = {
  auth: {
    register: "user/signup",
    login: "user/signin",
    loginTwitter: "success",
    forgotPassword: "/auth/forgot-password",
    verifyEmail: "auth/verify-email",
    resetPasswordByVerfToken: "auth/reset-password/",
    logout: "auth/logout",
  },

  user: {
    preferences: "user/preferences/create",
    favoritegame: "user/favorite-games/create",
    getUser: "user/getUser",
  },

  theNextLeg: {
    root: "the-next-leg",
    imagine: "the-next-leg/imagine",
    webhook: "the-next-leg/webhook",
  },

  design: {
    root: "design",
  },

  post: {
    create: "post/video/create",
    get: "post/video/get",
    delete: "post/video/delete",
  },

  clip: {
    create: "clip/video/create",
    get: "clip/video/get",
    delete: "clip/video/delete",
  },

  story: {
    create: "stories/story/create",
    get: "stories/story/get",
    delete: "stories/story/delete",
  },
  reaction: {
    create: "post/video/reaction/create",
    delete: "post/video/reaction/delete",
  },

  clipReaction: {
    create: "clip/video/reaction/create",
    delete: "clip/video/reaction/delete",
  },

  comment: {
    create: "post/comment/create",
  },

  music: {
    getAllMusic: "music/get/all",
  },
};

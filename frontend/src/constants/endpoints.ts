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
  post:{
    create: "post/video/create",
    get: "post/video/get",
    delete: "post/video/delete",
  },
  reaction:{
    create: "post/video/reaction/create",
    delete: "reaction/delete",
  },
  music: {
    getAllMusic: "music/get/all"
  }
};

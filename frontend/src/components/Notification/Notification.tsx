import { dispatch } from "@/store";
import { toastError } from "../Toast/Toast";
import {
  createNotification,
  updateNotification,
} from "@/store/slices/userSlice";

const handleCreateNotification = async (
  authStateID: any,
  postID: any,
  postUserID: any,
  notificationType: any
) => {
  const payload = {
    userID: postUserID,
    oppositionID: authStateID,
    postID: postID,
    notificationType: notificationType,
  };

  console.log(payload);

  const successCallback = (response: any) => {
    // handlePageRefresh();
  };

  const errorCallback = (error: string) => {
    toastError(error);
  };

  const params = {
    payload,
    successCallback,
    errorCallback,
  };

  dispatch(createNotification(params));
};

const handleUpdateNotification = async (
  authStateID: any,
  notificationID: any
) => {
  const payload = {
    userID: authStateID,
    notificationID: notificationID,
  };

  console.log("unotidication", payload);

  const successCallback = (response: any) => {
    // handlePageRefresh();
  };

  const errorCallback = (error: string) => {
    toastError(error);
  };

  const params = {
    payload,
    successCallback,
    errorCallback,
  };

  dispatch(updateNotification(params));
};

export { handleCreateNotification, handleUpdateNotification };

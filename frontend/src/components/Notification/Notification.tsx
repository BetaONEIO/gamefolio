import { dispatch } from "@/store";
import { toastError } from "../Toast/Toast";
import { createNotification } from "@/store/slices/userSlice";

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

export default handleCreateNotification;

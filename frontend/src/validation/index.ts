import { REGEX } from "@/constants/regex";
import { ERRORS } from "@/labels/error";

export const validateRegister = ({ name = "", username ="", email = "", password = "" }) => {
  if (REGEX.name.test(name) === false) return ERRORS.enterName;
  if (REGEX.username.test(username) === false) return ERRORS.enterUserName;


  if (REGEX.email.test(email) === false) return ERRORS.enterEmail;

  if (REGEX.password.test(password) === false) return ERRORS.passwordValidation;

  return "";
};

export const validateLogin = ({ email = "", password = "" }) => {
  if (REGEX.email.test(email) === false || email === "")
    return ERRORS.enterEmail;

  if (password === "") return ERRORS.enterPassword;

  return "";
};

export const validateForgetPassword = ({ email = "" }) => {
  if (email === "") return ERRORS.enterEmail;

  return "";
};

export const validateResetPassword = ({
  new_password = "",
  confirm_password = "",
}) => {
  if (REGEX.password.test(new_password) === false)
    return ERRORS.passwordValidation;

  if (confirm_password !== new_password) return ERRORS.enterConfirmPassword;

  return "";
};

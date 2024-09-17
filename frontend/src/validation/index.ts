import { REGEX } from "@/constants/regex";
import { ERRORS } from "@/labels/error";

export const validateRegisterInputFields = (input: {
  [key: string]: string;
}): string | boolean => {
  const name = input.name?.trim();
  const username = input.username?.trim();
  const email = input.email?.trim();
  const password = input.password?.trim();

  if (name) {
    if (name.length < 4) return "Name must be at least 4 characters";
    if (name.length > 12) return "Name can be a maximum of 12 characters";
    if (!/^[A-Za-z ]+$/.test(name))
      return "Name can only contain letters and spaces";
    if (!name.split(" ").every((word) => word[0].toUpperCase() === word[0]))
      return "Each word in the name must be capitalized";
  }

  if (username) {
    if (username.length < 4) return "Username must be at least 4 characters";
    if (username.length > 16)
      return "Username can be a maximum of 16 characters";
    if (!/^[A-Za-z0-9_]+$/.test(username))
      return "Username can only contain letters, numbers, and underscores";
    if (username.includes(" ")) return "Username cannot contain spaces";
  }

  if (email) {
    if (!email.includes("@")) return "Email must contain an @ symbol";
    if (!REGEX.email.test(email)) return "Invalid email format";
  }

  if (password) {
    if (password.length < 8) return "Password must be at least 8 characters";
    if (password.length > 32)
      return "Password can be a maximum of 32 characters";
    if (!/[0-9]/.test(password))
      return "Password must contain at least one number";
    if (!/[!@#$%^&*()_\-+=]/.test(password))
      return "Password must contain at least one special character";
  }

  return false;
};

export const validateRegister = ({
  name = "",
  username = "",
  email = "",
  password = "",
}) => {
  if (REGEX.name.test(name) === false) return ERRORS.enterName;
  if (REGEX.username.test(username) === false) return ERRORS.enterUserName;

  if (REGEX.email.test(email) === false) return ERRORS.enterEmail;

  if (REGEX.password.test(password) === false) return ERRORS.passwordValidation;

  return "";
};

export const validateLoginInputFields = (input: { [key: string]: string }) => {
  const email = input.email?.trim();
  const password = input.password?.trim();

  if (email) {
    if (!email.includes("@")) return "Email must contain an @ symbol";
    if (!REGEX.email.test(email)) return "Invalid email format";
  }

  if (password) {
    if (password.length < 8) return "Password must be at least 8 characters";
    if (password.length > 32)
      return "Password can be a maximum of 32 characters";
    if (!/[0-9]/.test(password))
      return "Password must contain at least one number";
    if (!/[!@#$%^&*()_\-+=]/.test(password))
      return "Password must contain at least one special character";
  }

  return false;
};

export const validateLogin = ({ email = "", password = "" }) => {
  if (REGEX.email.test(email) === false || email === "")
    return ERRORS.enterEmail;

  if (password) {
    if (password.length < 8) return "Password must be at least 8 characters";
    if (password.length > 32)
      return "Password can be a maximum of 32 characters";
    if (!/[0-9]/.test(password)) return ERRORS.enterPassword;
    if (!/[!@#$%^&*()_\-+=]/.test(password)) return ERRORS.enterPassword;
  }

  return "";
};

export const validateForgetPasswordInputFields = (input: {
  [key: string]: string;
}) => {
  const email = input.email?.trim();

  if (email) {
    if (!email.includes("@")) return "Email must contain an @ symbol";
    if (!REGEX.email.test(email)) return "Invalid email format";
  }

  return false;
};
export const validateForgetPassword = ({ email = "" }) => {
  if (email === "") return ERRORS.enterEmail;
  if (email) {
    if (!email.includes("@")) return "Email must contain an @ symbol";
    if (!REGEX.email.test(email)) return "Invalid email format";
  }

  return "";
};

export const validateResetPasswordInputFields = (input: {
  [key: string]: string;
}) => {
  const password = input.password?.trim();
  const confirmPassword = input.confirmPassword?.trim();

  // Validate password
  if (password) {
    // Ensure password field is not empty
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters";
    if (password.length > 32)
      return "Password can be a maximum of 32 characters";
    if (!/[0-9]/.test(password))
      return "Password must contain at least one number";
    if (!/[!@#$%^&*()_\-+=]/.test(password))
      return "Password must contain at least one special character";
  }

  // Validate confirmPassword
  if (confirmPassword) {
    // Ensure confirmPassword field is not empty
    if (!confirmPassword) return "Confirm password is required";
    if (confirmPassword.length < 8)
      return "Confirm password must be at least 8 characters";
    if (confirmPassword.length > 32)
      return "Confirm password can be a maximum of 32 characters";
    if (!/[0-9]/.test(confirmPassword))
      return "Confirm password must contain at least one number";
    if (!/[!@#$%^&*()_\-+=]/.test(confirmPassword))
      return "Confirm password must contain at least one special character";
  }

  return false;
};

export const validateResetPassword = ({
  password = "",
  confirmPassword = "",
}) => {
  if (REGEX.password.test(password) === false) {
    return ERRORS.passwordValidation;
  }

  // Validate password
  if (password) {
    // Ensure password field is not empty
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters";
    if (password.length > 32)
      return "Password can be a maximum of 32 characters";
    if (!/[0-9]/.test(password))
      return "Password must contain at least one number";
    if (!/[!@#$%^&*()_\-+=]/.test(password))
      return "Password must contain at least one special character";
  }

  // Validate confirmPassword
  if (confirmPassword) {
    // Ensure confirmPassword field is not empty
    if (!confirmPassword) return "Confirm password is required";
    if (confirmPassword.length < 8)
      return "Confirm password must be at least 8 characters";
    if (confirmPassword.length > 32)
      return "Confirm password can be a maximum of 32 characters";
    if (!/[0-9]/.test(confirmPassword))
      return "Confirm password must contain at least one number";
    if (!/[!@#$%^&*()_\-+=]/.test(confirmPassword))
      return "Confirm password must contain at least one special character";
  }

  // Check if confirmPassword matches password
  if (confirmPassword !== password) {
    return ERRORS.enterConfirmPassword;
  }

  return "";
};

export const validateEditProfileFields = (input: {
  [key: string]: string;
}): string | boolean => {
  const name = input.name?.trim();
  const username = input.username?.trim();
  const dateOfBirth = input.dateOfBirth?.trim();
  const bio = input.bio?.trim();

  if (name) {
    if (name.length < 4) return "Name must be at least 4 characters";
    if (name.length > 12) return "Name can be a maximum of 12 characters";
    if (!/^[A-Za-z ]+$/.test(name))
      return "Name can only contain letters and spaces";
    if (!name.split(" ").every((word) => word[0].toUpperCase() === word[0]))
      return "Each word in the name must be capitalized";
  }

  if (username) {
    if (username.length < 4) return "Username must be at least 4 characters";
    if (username.length > 16)
      return "Username can be a maximum of 16 characters";
    if (!/^[A-Za-z0-9_]+$/.test(username))
      return "Username can only contain letters, numbers, and underscores";
    if (username.includes(" ")) return "Username cannot contain spaces";
  }

  if (dateOfBirth) {
    // Check if the format is YYYY-MM-DD and if the date is in the past
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateOfBirth))
      return "Date of Birth must be in the format YYYY-MM-DD";
    const date = new Date(dateOfBirth);
    if (date > new Date()) return "Date of Birth cannot be in the future";
  }

  if (bio) {
    if (bio.length > 150) return "Bio can be a maximum of 150 characters";
  }

  return true;
};

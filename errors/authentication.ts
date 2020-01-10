import { ErrorResponse } from "./types";

interface AuthErrorTypes {
  AUTH_NO_P_OR_U: ErrorResponse;
  AUTH_USER_EXISTS: ErrorResponse;
  AUTH_USER_NOT_FOUND: ErrorResponse;
  AUTH_USER_WRONG_PW: ErrorResponse;
  AUTH_NO_TOKEN: ErrorResponse;
  AUTH_INVALID_TOKEN: ErrorResponse;
}

const authErrors = {
  AUTH_NO_P_OR_U: {
    message: "No username or password provided.",
    status: 401,
    code: "AUTH_NO_P_OR_U"
  },
  AUTH_USER_EXISTS: {
    message: "An account with that email already exists.",
    status: 401,
    code: "AUTH_USER_EXISTS"
  },
  AUTH_USER_NOT_FOUND: {
    message: "That account does not exist.",
    status: 401,
    code: "AUTH_USER_NOT_FOUND"
  },
  AUTH_USER_WRONG_PW: {
    message: "The password you have provided is incorrect.",
    status: 401,
    code: "AUTH_USER_WRONG_PW"
  },
  AUTH_NO_TOKEN: {
    message: "No Auth token.",
    status: 401,
    code: "AUTH_NO_TOKEN"
  },
  AUTH_INVALID_TOKEN: {
    message: "Invalid token.",
    status: 401,
    code: "AUTH_INVALID_TOKEN"
  }
} as AuthErrorTypes;

export default authErrors;

import { ErrorResponse } from "./types";

interface AuthErrorTypes {
  NOT_AUTHORIZED: ErrorResponse;
}

const authErrors = {
  NOT_AUTHORIZED: {
    message: "You are not authorized to perform this action.",
    status: 404,
    code: "NOT_AUTHORIZED"
  }
} as AuthErrorTypes;

export default authErrors;

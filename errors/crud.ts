import { ErrorResponse } from "./types";

interface AuthErrorTypes {
  RECORD_NOT_FOUND: ErrorResponse;
}

const authErrors = {
  RECORD_NOT_FOUND: {
    message: "Record not found.",
    status: 404,
    code: "RECORD_NOT_FOUND"
  }
} as AuthErrorTypes;

export default authErrors;

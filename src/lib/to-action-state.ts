import z, { ZodError } from "zod";

export type ActionState = {
  status?: "SUCCESS" | "ERROR";
  message: string;
  payload?: FormData;
  data?: unknown;
  fieldErrors: Record<string, string[] | undefined>;
  timestamp: number;
};

export const EMPTY_ACTION_STATE: ActionState = {
  message: "",
  fieldErrors: {},
  timestamp: Date.now(),
};

const fromErrorToActionState = (
  error: unknown,
  formData?: FormData,
): ActionState => {
  if (error instanceof ZodError) {
    return {
      timestamp: Date.now(),
      status: "ERROR",
      message: "",
      fieldErrors: z.flattenError(error).fieldErrors,
      payload: formData,
    };
  } else if (error instanceof Error) {
    return {
      timestamp: Date.now(),
      status: "ERROR",
      message: error.message,
      fieldErrors: {},
      payload: formData,
    };
  } else {
    return {
      timestamp: Date.now(),
      status: "ERROR",
      message: "Something went wrong",
      fieldErrors: {},
      payload: formData,
    };
  }
};

export const toActionState = (
  status: ActionState["status"],
  message: string,
  formData?: FormData,
  data?: unknown,
): ActionState => {
  return {
    timestamp: Date.now(),
    status,
    message,
    fieldErrors: {},
    payload: formData,
    data,
  };
};

export default fromErrorToActionState;

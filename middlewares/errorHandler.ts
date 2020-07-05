import {
  isHttpError,
  Context,
} from "https://deno.land/x/oak/mod.ts";

const errorHandler = async (
  { request, response }: Context,
  next: () => Promise<void>,
) => {
  try {
    await next();
  } catch (err) {
    if (isHttpError(err)) {
      response.status = err.status;
      const { message, status, stack } = err;
      if (request.accepts("json")) {
        response.body = { message, status, stack };
        response.type = "json";
      } else {
        response.body = `${status} ${message}\n\n${stack ?? ""}`;
        response.type = "text/plain";
      }
    } else {
      console.log(err);
      throw err;
    }
  }
};

export default errorHandler;

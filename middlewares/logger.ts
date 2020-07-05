import {
  green,
  cyan,
  bold,
} from "https://deno.land/std@0.60.0/fmt/colors.ts";
import {
  Context,
} from "https://deno.land/x/oak/mod.ts";

const logger = async (context: Context, next: () => Promise<void>) => {
  await next();
  const rt = context.response.headers.get("X-Response-Time");
  console.log(
    `${green(context.request.method)} ${
      cyan(decodeURIComponent(context.request.url.pathname))
    } - ${
      bold(
        String(rt),
      )
    }`,
  );
};

export default logger;

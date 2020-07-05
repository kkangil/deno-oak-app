import {
  Context,
} from "https://deno.land/x/oak/mod.ts";

const responseTime = async (context: Context, next: () => Promise<void>) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  context.response.headers.set("X-Response-Time", `${ms}ms`);
};

export default responseTime;

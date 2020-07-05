import {
  Application,
} from "https://deno.land/x/oak/mod.ts";

import router from "./routes/index.ts";
import notFound from "./middlewares/notFound.ts";
import errorHandler from "./middlewares/errorHandler.ts";
import logger from "./middlewares/logger.ts";
import responseTime from "./middlewares/responseTime.ts";

const app = new Application();

app.use(logger);
app.use(responseTime);
app.use(router.routes());
app.use(router.allowedMethods());
// A basic 404 page
app.use(notFound);
app.use(errorHandler);

console.log(`Server is listening on port 8000`);
await app.listen({ port: 8000 });

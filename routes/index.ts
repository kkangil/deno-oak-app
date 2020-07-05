import {
  Router,
} from "https://deno.land/x/oak/mod.ts";
import * as books from "./books.ts";

const router = new Router();

router
  .get("/", ({ response }) => {
    response.body = "Hello deno oak";
  })
  .get("/books", books.getBooks)
  .get("/books/:id", books.getBookById)
  .post("/books", books.createBook)
  .put("/books/:id", books.modifyBookById)
  .delete("/books/:id", books.deleteBookById);

export default router;

import {
  RouterContext,
  Status,
} from "https://deno.land/x/oak/mod.ts";
import {
  v4,
} from "https://deno.land/std/uuid/mod.ts";
import { Book } from "../interfaces.ts";

let books: Book[] = [
  {
    id: "1",
    title: "Book 1",
    author: "one",
  },
  {
    id: "2",
    title: "Book 2",
    author: "two",
  },
  {
    id: "3",
    title: "Book 3",
    author: "three",
  },
];

export const getBooks = ({ response }: RouterContext) => {
  response.body = books;
};

export const getBookById = (
  context: RouterContext<{ id: string }>,
) => {
  const { params, response } = context;
  const book: Book | undefined = books.find((book) => book.id === params.id);
  if (book) {
    response.body = book;
  } else {
    context.throw(Status.NotFound, "존재하지 않는 책");
  }
};

export const createBook = async (
  context: RouterContext,
) => {
  const { request, response } = context;
  if (!request.hasBody) {
    context.throw(Status.BadRequest, "데이터 없음");
  } else {
    const body = await request.body();
    const book: Book = body.value;
    book.id = v4.generate();
    books.push(book);
    response.status = 201;
    response.body = book;
  }
};

export const modifyBookById = async (
  context: RouterContext<{ id: string }>,
) => {
  const { params, request, response } = context;
  const bookIndex: number = books.findIndex((book) => book.id === params.id);
  if (bookIndex < 0) {
    context.throw(Status.NotFound, "존재하지 않는 책");
  } else {
    if (!request.hasBody) {
      context.throw(Status.BadRequest, "데이터 없음");
    } else {
      const body = await request.body();
      const book: Book = body.value;
      const preBook: Book = books[bookIndex];
      books.splice(bookIndex, 1, { ...preBook, ...book });
      response.status = 201;
      response.body = books[bookIndex];
    }
  }
};

export const deleteBookById = async (
  context: RouterContext<{ id: string }>,
) => {
  const { params, response } = context;
  const bookIndex: number = books.findIndex((book) => book.id === params.id);
  if (bookIndex < 0) {
    context.throw(Status.NotFound, "존재하지 않는 책");
  } else {
    books.splice(bookIndex, 1);
    response.status = 200;
  }
};

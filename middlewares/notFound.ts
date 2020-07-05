import {
  Status,
  Context,
} from "https://deno.land/x/oak/mod.ts";

const notFound = ({ request, response }: Context) => {
  response.status = Status.NotFound;
  response.body =
    `<html><body><h1>404 - Not Found</h1><p>Path <code>${request.url}</code> not found.`;
};

export default notFound;

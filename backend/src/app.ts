import fastify from "fastify";
import { testErrorCode } from "./errors.js";
import exampleRoute from "./routes/exampleRoute.js";
import usersR from "./routes/usersR.js";

import AppDataSource from "./db/data-source.js";

export async function buildApp(opts = {}) {
  const app = fastify(opts);

  await AppDataSource.initialize();
  app.decorate("db", AppDataSource);

  app.get("/", async (_response, _reply) => {
    return { hello: "world" };
  });
  app.get("/exampleError", async (_response, _reply) => {
    throw new testErrorCode();
  });

  app.register(exampleRoute);
  app.register(usersR);

  app.setErrorHandler(async function (error, request, reply) {
    request.log.error(error);
    reply.status(error.statusCode || 500);
    reply.send({ error: error.message });
  });

  // manually call the notfound error handler (can direct system to jump to this route)
  app.get("/notfound", async (_request, reply) => {
    reply.callNotFound();
  });

  app.setNotFoundHandler(async (request, reply) => {
    reply.code(404);
    return { error: "Not found" };
  });

  return app;
}

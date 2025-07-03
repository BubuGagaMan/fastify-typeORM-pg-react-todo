import fastify from "fastify";
import { testErrorCode } from "./errors.js";
export async function buildApp(opts = {}) {
    const app = fastify(opts);
    app.get("/", async (_response, _reply) => {
        return { hello: "world" };
    });
    app.get("/exampleError", async (_response, _reply) => {
        throw new testErrorCode();
    });
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

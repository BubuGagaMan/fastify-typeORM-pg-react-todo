import fastify from "fastify";

export async function buildApp(opts = {}) {
  const app = fastify(opts);
  app.get("/", async (_response, _reply) => {
    return { hello: "world" };
  });
  return app
}

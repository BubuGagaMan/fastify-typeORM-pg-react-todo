import { FastifyPluginAsync } from "fastify";
import { ReplyDefault } from "fastify/types/utils.js";
import { RequestBodyDefault } from "fastify/types/utils.js";


// @TODO - figure out the types for app, ops
export default async function exampleRoute(app: any, opts: any) {
  app.get("/exampleRoute", async (_request: RequestBodyDefault, reply: ReplyDefault) => {
    return { data: "some data" };
  });
}

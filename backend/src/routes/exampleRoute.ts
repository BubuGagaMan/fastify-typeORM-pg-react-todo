import { FastifyPluginAsync } from "fastify";
import { ReplyDefault } from "fastify/types/utils.js";


// @TODO - figure out the types for app, ops
//@TODO - find out how to type the request/reply
export default async function exampleRoute(app: any, opts: any) {
  app.get("/exampleRoute", async (_request: any, reply: ReplyDefault) => {
    return { data: "some data" };
  });

  const postSchema = {
    schema: {
        body: {
            type: 'object',
            properties: {
                label: { type: 'string' },
                value: { type: 'number' }
            }, 
            required: ['label', 'value']
        }
    }
  }


  app.post('/exampleRoute', postSchema, async (request: any, reply: ReplyDefault) => {
    const { label, value } = request.body

    // ...db query...

    return { label, value }

  })
}

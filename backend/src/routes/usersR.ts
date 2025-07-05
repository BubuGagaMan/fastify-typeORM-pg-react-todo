import { FastifyInstance } from "fastify";
import usersC from "../controllers/usersC.js";

export default async function usersR(app: FastifyInstance) {
  const postSchema = {
    schema: {
      body: {
        type: "object",
        properties: {
          username: { type: "string", minLength: 4, maxLength: 24 },
          email: { type: "string", format: "email" },
          password: { type: "string", minLength: 8 },
        },
        additionalProperties: false,
        required: ["username", "password", "email"],
      },
    },
  };

  app.get("/users", usersC.getAll);
  app.get("/users/:id", usersC.getById);
  app.post("/users", postSchema, usersC.create);
  app.put("/users/:id", usersC.updateById);
  app.delete("/users/:id", usersC.deleteById);
}

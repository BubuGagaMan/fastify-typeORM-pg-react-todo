import { FastifyInstance } from "fastify";
import usersC from "../controllers/usersC.js";

export default async function usersR(app: FastifyInstance) {
  const postSchema = {
    schema: {
      body: {
        type: "object",
        properties: {
          username: { type: "string" },
          email: { type: "string" },
          password: { type: "string" },
        },
        required: ["username", "password", "email"],
      },
    },
  };

  app.get("/users", usersC.getAll);
  app.get("/users/:id", usersC.getById);
  app.post("/users", usersC.create);
  app.put("/users/:id", postSchema, usersC.updateById);
  app.delete("/users/:id", usersC.deleteById);
}

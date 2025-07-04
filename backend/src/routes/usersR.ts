import { FastifyInstance } from "fastify";
import usersC from "../controllers/usersC.js";

export default async function usersR(app: FastifyInstance) {

  app.get("/users", usersC.getAll);
  app.get("/users/:id", usersC.getById);
  app.post("/users", usersC.create);
  app.put("/users/:id", usersC.updateById);
  app.delete("/users/:id", usersC.deleteById);

}

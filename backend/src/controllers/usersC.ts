import { FastifyRequest, FastifyReply } from "fastify";
import { User } from "../db/entities/User.js";

interface CreateUserBody {
  username: string;
  email: string;
  password: string;
}

type RequestWithIdParams = FastifyRequest<{ Params: { id: string } }>;

const getAll = async (req: FastifyRequest, reply: FastifyReply) => {
  const userRepo = req.server.db.getRepository(User);

  const users = await userRepo.find();

  reply
    .status(200)
    .send({ message: "Successfully retrieved all users!", data: users });
};

const getById = async (req: RequestWithIdParams, reply: FastifyReply) => {
  const { id } = req.params;
  return { userIdToGet: id };
};

const create = async (
  req: FastifyRequest<{ Body: CreateUserBody }>,
  reply: FastifyReply
) => {
  const userRepo = req.server.db.getRepository(User);
  const { username, password, email } = req.body;

  const user = {
    username,
    password,
    email,
  };
  await userRepo.save(user);

  reply.status(201).send({ message: "User created successfully!", data: user });
};

const updateById = async (
  req: FastifyRequest<{ Body: CreateUserBody; Params: { id: string } }>,
  reply: FastifyReply
) => {
  const { id } = req.params;
  const { username, password, email } = req.body;

  return {
    userIdToUpdate: id,
    username,
    email,
    password,
  };
};

const deleteById = async (req: RequestWithIdParams, reply: FastifyReply) => {
  const { id } = req.params;
  return {
    userIdToDelete: id,
  };
};

export default {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};

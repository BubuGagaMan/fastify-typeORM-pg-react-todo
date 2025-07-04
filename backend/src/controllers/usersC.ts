import { FastifyRequest, FastifyReply } from "fastify";

interface CreateUserBody {
  username: string;
  email: string;
  password: string;
}

type RequestWithIdParams = FastifyRequest<{ Params: { id: string } }>;

const getAll = async (req: FastifyRequest, reply: FastifyReply) => {
  return { allUsers: "all users" };
};

const getById = async (req: RequestWithIdParams, reply: FastifyReply) => {
  const { id } = req.params;
  return { userIdToGet: id };
};

const create = async (
  req: FastifyRequest<{ Body: CreateUserBody }>,
  reply: FastifyReply
) => {
  const { username, email, password } = req.body;

  return {
    username,
    email,
    password,
  };
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
    deleteById
}



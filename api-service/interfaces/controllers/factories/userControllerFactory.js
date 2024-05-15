import CreateUser from "../../../application/use-cases/createUser.js";
import PrismaUserRepository from "../../../infrastructure/database/prisma/repositories/prismaUserRepository.js";
import UserController from "../userController.js";

export const makeUserController = () => {
  const userRepository = new PrismaUserRepository();
  const createUserUseCase = new CreateUser(userRepository);

  return  new UserController(createUserUseCase);
}
import CreateUser from "../../../application/use-cases/createUser.js";
import PrismaUserRepository from "../../../infrastructure/database/prisma/repositories/prismaUserRepository.js";
import PasswordGeneratorService from "../../services/passwordGenerator.js";
import UserController from "../userController.js";

export const makeUserController = () => {
  const userRepository = new PrismaUserRepository();
  const passwordGeneratorService = new PasswordGeneratorService
  const createUserUseCase = new CreateUser({ userRepository, passwordGeneratorService });

  return new UserController(createUserUseCase);
}
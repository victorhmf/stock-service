import LoginUser from "../../../application/use-cases/loginUser.js";
import PrismaUserRepository from "../../../infrastructure/database/prisma/repositories/prismaUserRepository.js";
import TokenGeneratorService from "../../services/tokenGenerator.js";
import LoginController from "../loginController.js";

export const makeLoginController = () => {
  const userRepository = new PrismaUserRepository();
  const tokenGeneratorService = new TokenGeneratorService()
  const loginUserUseCase = new LoginUser({ userRepository, tokenGeneratorService });

  return new LoginController(loginUserUseCase);
}
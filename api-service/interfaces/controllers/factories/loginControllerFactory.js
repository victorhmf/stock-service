import LoginUser from "../../../application/use-cases/loginUser.js";
import PrismaUserRepository from "../../../infrastructure/database/prisma/repositories/prismaUserRepository.js";
import LoginController from "../loginController.js";

export const makeLoginController = () => {
  const userRepository = new PrismaUserRepository();
  const loginUserUseCase = new LoginUser(userRepository);

  return  new LoginController(loginUserUseCase);
}
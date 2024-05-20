import CreateUser from "../../../application/use-cases/createUser.js";
import ResetPassword from "../../../application/use-cases/resetPassword.js";
import PrismaUserRepository from "../../../infrastructure/database/prisma/repositories/prismaUserRepository.js";
import EmailService from "../../services/emailService.js";
import PasswordGeneratorService from "../../services/passwordGenerator.js";
import UserController from "../userController.js";

export const makeUserController = () => {
  const userRepository = new PrismaUserRepository();
  const passwordGeneratorService = new PasswordGeneratorService
  const createUserUseCase = new CreateUser({ userRepository, passwordGeneratorService });

  const emailService = new EmailService()
  const resetPasswordUseCase = new ResetPassword({ userRepository, passwordGeneratorService, emailService })

  return new UserController({ createUserUseCase, resetPasswordUseCase });
}
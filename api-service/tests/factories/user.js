
import CreateUser from "../../application/use-cases/createUser";
import PrismaUserRepository from "../../infrastructure/database/prisma/repositories/prismaUserRepository";
import PasswordGeneratorService from "../../interfaces/services/passwordGenerator";

export const createUser = async ({ email, role }) => {
  const userRepository = new PrismaUserRepository();
  const passwordGeneratorService = new PasswordGeneratorService
  const createUserUseCase = new CreateUser({ userRepository, passwordGeneratorService });
  const user = await createUserUseCase.execute({ email, role })

  return user
}
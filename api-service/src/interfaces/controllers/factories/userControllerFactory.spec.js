import { makeUserController } from './userControllerFactory';
import UserController from '../userController';
import CreateUser from '../../../application/use-cases/createUser';
import PrismaUserRepository from '../../../infrastructure/database/prisma/repositories/prismaUserRepository';
import PasswordGeneratorService from '../../services/passwordGenerator';

jest.mock('../../../application/use-cases/createUser');
jest.mock('../../../infrastructure/database/prisma/repositories/prismaUserRepository');
jest.mock('../../services/passwordGenerator');

describe('makeUserController', () => {
  it('should create a UserController with correct dependencies', () => {
    const userController = makeUserController();

    expect(CreateUser).toHaveBeenCalledWith({
      userRepository: expect.any(PrismaUserRepository),
      passwordGeneratorService: expect.any(PasswordGeneratorService),
    });
    expect(PrismaUserRepository).toHaveBeenCalledTimes(1);
    expect(PasswordGeneratorService).toHaveBeenCalledTimes(1);
    expect(userController).toBeInstanceOf(UserController);
  });
});

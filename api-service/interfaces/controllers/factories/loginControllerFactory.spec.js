import { makeLoginController } from './loginControllerFactory';
import LoginController from '../loginController';
import LoginUser from '../../../application/use-cases/loginUser';
import PrismaUserRepository from '../../../infrastructure/database/prisma/repositories/prismaUserRepository';
import TokenGeneratorService from '../../services/tokenGenerator';

jest.mock('../../../application/use-cases/loginUser');
jest.mock('../../../infrastructure/database/prisma/repositories/prismaUserRepository');
jest.mock('../../services/tokenGenerator');

describe('makeLoginController', () => {
  it('should create a LoginController with correct dependencies', () => {
    const loginController = makeLoginController();

    expect(LoginUser).toHaveBeenCalledWith({
      userRepository: expect.any(PrismaUserRepository),
      tokenGeneratorService: expect.any(TokenGeneratorService),
    });
    expect(PrismaUserRepository).toHaveBeenCalledTimes(1);
    expect(TokenGeneratorService).toHaveBeenCalledTimes(1);
    expect(loginController).toBeInstanceOf(LoginController);
  });
});

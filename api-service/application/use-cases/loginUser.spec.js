import LoginUser from './loginUser';
import { InvalidCredentialsError } from '../errors/InvalidCredentials.js';

describe('LoginUser', () => {
  let loginUser;
  let userRepository;
  let tokenGeneratorService;

  beforeEach(() => {
    userRepository = {
      findByEmail: jest.fn(),
    };
    tokenGeneratorService = {
      generate: jest.fn(),
    };
    loginUser = new LoginUser({ userRepository, tokenGeneratorService });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#execute', () => {
    const email = 'test@example.com';
    const password = 'password123';
    const user = {
      id: 'user123',
      email,
      password: 'password123',
      role: 'user',
    };
    const token = 'abc123';

    describe('on success', () => {
      beforeEach(() => {
        userRepository.findByEmail.mockResolvedValue(user);
        tokenGeneratorService.generate.mockReturnValue(token);
      });

      it('should fetch user by email from userRepository', async () => {
        await loginUser.execute({ email, password });
        expect(userRepository.findByEmail).toHaveBeenCalledWith(email);
      });

      it('should generate token using tokenGeneratorService', async () => {
        await loginUser.execute({ email, password });
        expect(tokenGeneratorService.generate).toHaveBeenCalledWith({
          id: user.id,
          email: user.email,
          role: user.role,
        });
      });

      it('should return the generated token', async () => {
        const result = await loginUser.execute({ email, password });
        expect(result).toBe(token);
      });
    });

    describe('on fail', () => {
      describe('when user is not found', () => {
        it('should throw InvalidCredentialsError', async () => {
          userRepository.findByEmail.mockResolvedValue(null);

          await expect(loginUser.execute({ email, password })).rejects.toThrow(InvalidCredentialsError);
        });
      });

      describe('when password is incorrect', () => {
        it('should throw InvalidCredentialsError', async () => {
          userRepository.findByEmail.mockResolvedValue({ ...user, password: 'wrongpassword' });

          await expect(loginUser.execute({ email, password })).rejects.toThrow(InvalidCredentialsError);
        });
      });
    });
  });
});

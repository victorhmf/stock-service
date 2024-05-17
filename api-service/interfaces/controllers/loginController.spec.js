import LoginController from './loginController';
import { InvalidCredentialsError } from '../../application/errors/InvalidCredentials';

describe('LoginController', () => {
  let loginController;
  let loginUserUseCase;
  let req;
  let res;
  let next;

  beforeEach(() => {
    loginUserUseCase = {
      execute: jest.fn(),
    };
    loginController = new LoginController(loginUserUseCase);
    req = {
      body: {
        email: 'test@example.com',
        password: 'password123',
      },
    };
    res = {
      json: jest.fn(),
      status: jest.fn(() => res),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should call loginUserUseCase execute with email and password from request body', async () => {
      await loginController.login(req, res, next);

      expect(loginUserUseCase.execute).toHaveBeenCalledWith({
        email: req.body.email,
        password: req.body.password,
      });
    });

    it('should return access token in JSON response', async () => {
      const accessToken = 'generatedToken';
      loginUserUseCase.execute.mockResolvedValueOnce(accessToken);

      await loginController.login(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ accessToken });
    });

    it('should return status 401 and "Invalid credentials." message if InvalidCredentialsError is thrown', async () => {
      const invalidCredentialsError = new InvalidCredentialsError('Invalid credentials.');
      loginUserUseCase.execute.mockRejectedValueOnce(invalidCredentialsError);

      await loginController.login(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials.' });
    });

    it('should call next with error if error is not an instance of InvalidCredentialsError', async () => {
      const unknownError = new Error('Unknown error.');
      loginUserUseCase.execute.mockRejectedValueOnce(unknownError);

      await loginController.login(req, res, next);

      expect(next).toHaveBeenCalledWith(unknownError);
    });
  });
});

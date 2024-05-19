import UserController from './userController';
import createUserDTO from '../../application/dtos/createUserDto';

jest.mock('../../application/dtos/createUserDto');

describe('UserController', () => {
  let userController;
  let createUserUseCase;
  let req;
  let res;
  let next;

  beforeEach(() => {
    createUserUseCase = {
      execute: jest.fn(),
    };
    userController = new UserController(createUserUseCase);
    req = {
      body: {
        email: 'test@example.com',
        role: 'user',
      },
    };
    res = {
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should call createUserUseCase execute with email and role from request body', async () => {
      await userController.create(req, res, next);

      expect(createUserUseCase.execute).toHaveBeenCalledWith({
        email: req.body.email,
        role: req.body.role,
      });
    });

    it('should return the created user in JSON response', async () => {
      const email = 'test@example.com'
      const createdUser = { id: 'user123', email: 'test@example.com', role: 'user' };
      createUserUseCase.execute.mockResolvedValueOnce(createdUser);
      
      
      const mockParsedUser = { email, password: '123' };
      createUserDTO.mockImplementation(() => mockParsedUser);

      await userController.create(req, res, next);

      expect(res.json).toHaveBeenCalledWith(mockParsedUser);
    });

    it('should call next with error if createUserUseCase execute throws an error', async () => {
      const error = new Error('Failed to create user.');
      createUserUseCase.execute.mockRejectedValueOnce(error);

      await userController.create(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});


import CreateUser from './createUser';
import User from '../../domain/entities/user';
import createUserDTO from '../dtos/createUserDto';
import EmailValidator from '../validators/emailValidator';

jest.mock('../../domain/entities/user');
jest.mock('../dtos/createUserDto');
jest.mock('../validators/emailValidator');

describe('CreateUser', () => {
  let createUser;
  let userRepository;
  let passwordGeneratorService;
  let mockValidate;

  beforeEach(() => {
    userRepository = {
      create: jest.fn(),
    };
    passwordGeneratorService = {
      generate: jest.fn(),
    };
    createUser = new CreateUser({ userRepository, passwordGeneratorService });
   
    mockValidate = jest.fn().mockResolvedValue(true)
    EmailValidator.mockImplementation(() => ({
      validate: mockValidate
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#execute', () => {
    const userData = {
      email: 'test@example.com',
      role: 'user',
    };
    const mockPassword = 'password123';
    const mockUserInstance = { ...userData, password: mockPassword };
    const mockParsedUser = { email: userData.email, role: userData.role };

    describe('on success', () => {
      beforeEach(() => {
        passwordGeneratorService.generate.mockReturnValue(mockPassword);
        User.mockImplementation(() => mockUserInstance);
        userRepository.create.mockResolvedValue(mockUserInstance);
        createUserDTO.mockImplementation(() => mockParsedUser);
      });

      it('should validate the email', async () => {
        await createUser.execute(userData);
        expect(EmailValidator).toHaveBeenCalledWith(userRepository);
      });

      it('should call validate method of EmailValidator', async () => {
        await createUser.execute(userData);
        expect(mockValidate).toHaveBeenCalledWith(userData.email);
      });

      it('should generate a password', async () => {
        await createUser.execute(userData);
        expect(passwordGeneratorService.generate).toHaveBeenCalled();
      });

      it('should create a User instance with correct data', async () => {
        await createUser.execute(userData);
        expect(User).toHaveBeenCalledWith({ ...userData, password: mockPassword });
      });

      it('should save the user in the repository', async () => {
        await createUser.execute(userData);
        expect(userRepository.create).toHaveBeenCalledWith(mockUserInstance);
      });

      it('should return a createUserDTO instance', async () => {
        const result = await createUser.execute(userData);
        expect(createUserDTO).toHaveBeenCalledWith(mockUserInstance);
        expect(result).toEqual(mockParsedUser);
      });
    });

    describe('on fail', () => {
      describe('by email validation', () => {
        it('should throw an error if email validation fails', async () => {
          EmailValidator.mockImplementation(() => ({
            validate: jest.fn().mockRejectedValue(new Error('Invalid email')),
          }));

          await expect(createUser.execute(userData)).rejects.toThrow('Invalid email');
        });
      });

      describe('by password generation', () => {
        it('should throw an error if password generation fails', async () => {
          passwordGeneratorService.generate.mockImplementation(() => {
            throw new Error('Password generation failed');
          });

          EmailValidator.mockImplementation(() => ({
            validate: jest.fn().mockResolvedValue(true),
          }));

          await expect(createUser.execute(userData)).rejects.toThrow('Password generation failed');
        });
      });

      describe('by user creation in repository', () => {

        it('should throw an error if saving user in repository fails', async () => {
          passwordGeneratorService.generate.mockReturnValue(mockPassword);
          User.mockImplementation(() => mockUserInstance);
          userRepository.create.mockRejectedValue(new Error('Database error'));
          
          await expect(createUser.execute(userData)).rejects.toThrow('Database error');
        });
      });
    });
  });
});


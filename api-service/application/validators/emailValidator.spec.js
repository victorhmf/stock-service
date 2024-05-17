import EmailValidator from './emailValidator';
import { EmailNotUniqueError } from '../errors/EmailNotUniqueError.js';

describe('EmailValidator', () => {
  let emailValidator;
  let userRepository;

  beforeEach(() => {
    userRepository = {
      findByEmail: jest.fn(),
    };
    emailValidator = new EmailValidator(userRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#validate', () => {
    const email = 'test@example.com';

    describe('when email is unique', () => {
      beforeEach(() => {
        userRepository.findByEmail.mockResolvedValue(null);
      });

      it('should not throw any error', async () => {
        await expect(emailValidator.validate(email)).resolves.not.toThrow();
      });
    });

    describe('when email is not unique', () => {
      beforeEach(() => {
        userRepository.findByEmail.mockResolvedValue({ email });
      });

      it('should throw EmailNotUniqueError', async () => {
        await expect(emailValidator.validate(email)).rejects.toThrow(EmailNotUniqueError);
      });
    });

    describe('when userRepository.findByEmail throws an error', () => {
      beforeEach(() => {
        userRepository.findByEmail.mockRejectedValue(new Error('Database error'));
      });

      it('should throw the error', async () => {
        await expect(emailValidator.validate(email)).rejects.toThrow('Database error');
      });
    });
  });
});

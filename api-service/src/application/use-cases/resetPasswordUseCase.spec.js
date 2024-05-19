import ResetPassword from './resetPassword';
import { UserNotFoundError } from '../errors/UserNotFoundError';

describe('ResetPassword', () => {
  let resetPassword;
  let userRepository;
  let passwordGeneratorService;
  let emailService;

  beforeEach(() => {
    userRepository = {
      findByEmail: jest.fn(),
      updatePassword: jest.fn(),
    };
    passwordGeneratorService = {
      generate: jest.fn().mockReturnValue('newPassword'),
    };
    emailService = {
      sendMail: jest.fn(),
    };
    resetPassword = new ResetPassword({ userRepository, passwordGeneratorService, emailService });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#execute', () => {
    const email = 'test@example.com';

    describe('on success', () => {
      describe('when user exists', () => {
        const user = { id: 'userId' };

        beforeEach(() => {
          userRepository.findByEmail.mockResolvedValue(user);
        });

        it('should find the user by email', async () => {
          await resetPassword.execute(email);
          expect(userRepository.findByEmail).toHaveBeenCalledWith(email);
        });

        it('should generate a new password', async () => {
          await resetPassword.execute(email);
          expect(passwordGeneratorService.generate).toHaveBeenCalled();
        });

        it('should update the user password', async () => {
          await resetPassword.execute(email);
          expect(userRepository.updatePassword).toHaveBeenCalledWith({ userId: user.id, newPassword: 'newPassword' });
        });

        it('should send an email with the new password', async () => {
          await resetPassword.execute(email);
          const expectedEmailContent = `Your new password is: newPassword`;
          expect(emailService.sendMail).toHaveBeenCalledWith({ to: email, subject: 'Password Recovery', text: expectedEmailContent });
        });
      });
    });


    describe('on fail', () => {
      describe('when user does not exist', () => {
        it('should throw UserNotFoundError', async () => {
          userRepository.findByEmail.mockResolvedValue(null);

          await expect(resetPassword.execute(email)).rejects.toThrow(UserNotFoundError);
        });
      });

      describe('by updatePassword', () => {
        it('should throw UserNotFoundError', async () => {
          const user = { id: 'userId' };
          userRepository.findByEmail.mockResolvedValue(user);
          const error = new Error('Error on updating password')
          userRepository.updatePassword.mockRejectedValue(error)

          await expect(resetPassword.execute(email)).rejects.toThrow(error);
        });
      });

      describe('by sendEmail', () => {
        it('should throw UserNotFoundError', async () => {
          const user = { id: 'userId' };
          userRepository.findByEmail.mockResolvedValue(user);
          userRepository.updatePassword.mockResolvedValue('new password')
          const error = new Error('Error on sending email')
          emailService.sendMail.mockRejectedValue(error)

          await expect(resetPassword.execute(email)).rejects.toThrow(error);
        });
      });
    });
  });
});

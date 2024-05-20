import { UserNotFoundError } from '../errors/UserNotFoundError.js'

class ResetPassword {
  constructor({ userRepository, passwordGeneratorService, emailService }) {
    this.userRepository = userRepository
    this.passwordGeneratorService = passwordGeneratorService
    this.emailService = emailService
  }

  async execute(email) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new UserNotFoundError()

    const newPassword = this.passwordGeneratorService.generate();
    await this.userRepository.updatePassword({ userId: user.id, newPassword });

    const emailContent = `Your new password is: ${newPassword}`;
    return this.emailService.sendMail({ to: email, subject: 'Password Recovery', text: emailContent });
  }
}

export default ResetPassword
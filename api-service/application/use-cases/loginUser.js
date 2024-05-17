import { InvalidCredentialsError } from '../errors/InvalidCredentials.js';

class LoginUser {
  constructor({ userRepository, tokenGeneratorService }) {
    this.userRepository = userRepository;
    this.tokenGeneratorService = tokenGeneratorService
  }

  async execute({ email, password }) {
    const user = await this.userRepository.findByEmail(email)
    if (password !== user?.password) throw new InvalidCredentialsError()

    const token = this.tokenGeneratorService.generate({
      id: user.id,
      email: user.email,
      role: user.role,
    })

    return token
  }
}
export default LoginUser;

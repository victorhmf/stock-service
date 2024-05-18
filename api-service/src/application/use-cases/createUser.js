import User from "../../domain/entities/user.js";
import createUserDTO from "../dtos/createUserDto.js";
import EmailValidator from "../validators/emailValidator.js";

class CreateUser {
  constructor({userRepository, passwordGeneratorService}) {
    this.userRepository = userRepository;
    this.passwordGeneratorService = passwordGeneratorService
  }

  async execute({ email, role }) {
    const emailValidator = new EmailValidator(this.userRepository)
    await emailValidator.validate(email)
    
    const password = this.passwordGeneratorService.generate()

    const user = new User({
      email,
      password,
      role
    })

    await this.userRepository.create(user);
    const parsedUser = new createUserDTO(user)

    return parsedUser
  }
}
export default CreateUser;

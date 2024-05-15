import User from "../../domain/entities/user.js";
import PasswordGenerator from "../services/PasswordGenerator.js";
import EmailValidator from "../validators/EmailValidator.js";

class CreateUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ email, role }) {
    const emailValidator = new EmailValidator(this.userRepository)
    await emailValidator.validate(email)

    const password = PasswordGenerator.generate()

    const user = new User({
      email,
      password,
      role
    })

    return await this.userRepository.create(user);
  }
}
export default CreateUser;

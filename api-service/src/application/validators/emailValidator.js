import { EmailNotUniqueError } from "../errors/EmailNotUniqueError.js";

class EmailValidator {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async validate(email) {
    const isUnique = await this.#isUnique(email)
    if (!isUnique) throw new EmailNotUniqueError()
  }

  async #isUnique(email) {
    const user = await this.userRepository.findByEmail(email)

    return user?.email !== email
  }
}

export default EmailValidator
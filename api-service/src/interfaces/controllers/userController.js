import CreateUserDTO from "../../application/dtos/createUserDto.js";

class UserController {
  constructor({ createUserUseCase, resetPasswordUseCase }) {
    this.createUserUseCase = createUserUseCase;
    this.resetPasswordUseCase = resetPasswordUseCase
  }

  async create(req, res, next) {
    try {
      const { email, role } = req.body
      const user = await this.createUserUseCase.execute({ email, role });
      const parsedUser = new CreateUserDTO(user)

      return res.json(parsedUser);
    } catch (error) {
      next(error)
    }
  }

  async resetPassword(req, res, next) {
    try {
      const { email } = req.body
      await this.resetPasswordUseCase.execute(email);

      return res.json({ message: "You will receive an email with your new password." });
    } catch (error) {
      next(error)
    }
  }
}

export default UserController;

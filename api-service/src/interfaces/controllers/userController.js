import CreateUserDTO from "../../application/dtos/createUserDto.js";

class UserController {
  constructor(createUserUseCase) {
    this.createUserUseCase = createUserUseCase;
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
}

export default UserController;

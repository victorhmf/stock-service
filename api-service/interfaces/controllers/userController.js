class UserController {
  constructor(createUserUseCase) {
    this.createUserUseCase = createUserUseCase;
  }

  async create(req, res, next) {
    try {
      const { email, role } = req.body
      const user = await this.createUserUseCase.execute({email, role});
      
      return res.json(user);
    } catch (error) {
      next(error)
    }
  }
}

export default UserController;

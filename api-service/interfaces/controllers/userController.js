class UserController {
  constructor(createUserUseCase) {
    this.createUserUseCase = createUserUseCase;
  }

  async create(req, res, next) {
    try {
      const { email, role } = req.body
      console.log(req.body)

      const user = await this.createUserUseCase.execute({email, role});
      res.json(user);
    } catch (error) {
      console.log(error)
      res.status(500).send(error.message);
    }
  }
}

export default UserController;

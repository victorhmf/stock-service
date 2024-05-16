import { InvalidCredentialsError } from "../../application/errors/InvalidCredentials.js";

class LoginController {
  constructor(loginUserUseCase) {
    this.loginUserUseCase = loginUserUseCase;
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body
      const accessToken = await this.loginUserUseCase.execute({ email, password });

      res.json({ accessToken });
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }

      return next(error)
    }
  }
}

export default LoginController;

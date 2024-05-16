import jwt from 'jsonwebtoken'
import { InvalidCredentialsError } from '../errors/InvalidCredentials.js';

class LoginUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ email, password }) {
    const user = await this.userRepository.findByEmail(email)
    if(password !== user.password) throw new InvalidCredentialsError()
  
    const accessToken = jwt.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    }, process.env.SECRET_KEY);
    
    return accessToken
  }
}
export default LoginUser;

import jwt from 'jsonwebtoken'

class TokenGeneratorService {
  async generate(data) {
    const accessToken = jwt.sign( data, process.env.SECRET_KEY, { expiresIn: '60m' });

    return accessToken
  }
} 

export default TokenGeneratorService
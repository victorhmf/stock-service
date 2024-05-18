import jwt from 'jsonwebtoken'

class TokenGeneratorService {
  async generate(data) {
    const accessToken = jwt.sign( data, process.env.SECRET_KEY, { expiresIn: '10m' });

    return accessToken
  }
} 

export default TokenGeneratorService
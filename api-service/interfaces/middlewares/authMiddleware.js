import jwt from 'jsonwebtoken'

class AuthMiddleware {
  async authenticate(req, res, next) {
    try {
      const token = req.headers?.authorization?.replace('Bearer ', '')

      if (!token) throw new Error('Invalid Token')
  
      const decodedUser = jwt.verify(token, process.env.SECRET_KEY)
      req.user = decodedUser

      return next()
    } catch (error) {
      console.error(error)
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }
}

export default new AuthMiddleware();

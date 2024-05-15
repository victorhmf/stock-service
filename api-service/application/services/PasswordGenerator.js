import crypto from 'crypto';

class PasswordGenerator {
  static generate(length = 12) {
    return crypto.randomBytes(length).toString('hex').slice(0, length);
  }
}

export default PasswordGenerator;
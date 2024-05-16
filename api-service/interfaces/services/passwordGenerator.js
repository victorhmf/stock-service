import crypto from 'crypto';

class PasswordGeneratorService {
  generate(length = 12) {
    return crypto.randomBytes(length).toString('hex').slice(0, length);
  }
}

export default PasswordGeneratorService;
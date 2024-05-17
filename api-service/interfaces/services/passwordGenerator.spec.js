import PasswordGeneratorService from './passwordGenerator';
import crypto from 'crypto';

jest.mock('crypto');

describe('PasswordGeneratorService', () => {
  describe('generate', () => {
    it('should generate a password of specified length', () => {
      const length = 12;
      const mockRandomBytes = 'abc123';

      crypto.randomBytes.mockReturnValueOnce(Buffer.from(mockRandomBytes, 'hex'));

      const passwordGeneratorService = new PasswordGeneratorService();
      const generatedPassword = passwordGeneratorService.generate(length);

      expect(crypto.randomBytes).toHaveBeenCalledWith(length);
      expect(generatedPassword).toEqual(mockRandomBytes.slice(0, length));
    });

    it('should generate a password with default length if no length is provided', () => {
      const defaultLength = 12;
      const mockRandomBytes = 'abc123';

      crypto.randomBytes.mockReturnValueOnce(Buffer.from(mockRandomBytes, 'hex'));

      const passwordGeneratorService = new PasswordGeneratorService();
      const generatedPassword = passwordGeneratorService.generate();

      expect(crypto.randomBytes).toHaveBeenCalledWith(defaultLength);
      expect(generatedPassword).toEqual(mockRandomBytes.slice(0, defaultLength));
    });
  });
});

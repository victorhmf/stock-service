import TokenGeneratorService from './tokenGenerator';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');

describe('TokenGeneratorService', () => {
  describe('generate', () => {
    it('should generate a token with the provided data', async () => {
      const data = { id: 'user123', email: 'test@example.com', role: 'admin' };
      const accessToken = 'generatedToken';
      
      jwt.sign.mockReturnValue(accessToken);

      const tokenGeneratorService = new TokenGeneratorService();
      const generatedToken = await tokenGeneratorService.generate(data);

      expect(jwt.sign).toHaveBeenCalledWith(data, process.env.SECRET_KEY, { expiresIn: '10m' });
      expect(generatedToken).toEqual(accessToken);
    });

    it('should throw an error if jwt.sign throws an error', async () => {
      const data = { id: 'user123', email: 'test@example.com', role: 'admin' };
      const error = new Error('Failed to sign token');
      
      jwt.sign.mockImplementation(() => {
        throw error;
      });
      const tokenGeneratorService = new TokenGeneratorService();

      await expect(tokenGeneratorService.generate(data)).rejects.toThrow(error);
    });
  });
});

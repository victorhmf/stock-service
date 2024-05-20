import PrismaUserRepository from './prismaUserRepository';
import db from '../index';

jest.mock('../index', () => ({
  user: {
    create: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn()
  },
}));

describe('PrismaUserRepository', () => {
  let prismaUserRepository;

  beforeEach(() => {
    prismaUserRepository = new PrismaUserRepository();
  });

  describe('create', () => {
    it('should call db.user.create with the correct data', async () => {
      const mockUser = { email: 'test@example.com', password: 'password123', role: 'user' };
      await prismaUserRepository.create(mockUser);
      expect(db.user.create).toHaveBeenCalledWith({
        data: mockUser,
      });
    });
  });

  describe('findByEmail', () => {
    it('should call db.user.findUnique with the correct email', async () => {
      const email = 'test@example.com';
      await prismaUserRepository.findByEmail(email);
      expect(db.user.findUnique).toHaveBeenCalledWith({
        where: { email },
      });
    });
  });

  describe('updatePassword', () => {
    it('should call db.user.update with the correct data', async () => {
      const userId = 1
      const newPassword = 'newPassword';

      await prismaUserRepository.updatePassword({ userId, newPassword });
      expect(db.user.update).toHaveBeenCalledWith({
        where: { id: userId },
        data: { password: newPassword },
      });
    });
  });
});

import PrismaUserRepository from './prismaUserRepository';
import db from '../index';

jest.mock('../index', () => ({
  user: {
    create: jest.fn(),
    findUnique: jest.fn(),
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
});

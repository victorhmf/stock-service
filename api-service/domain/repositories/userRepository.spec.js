import UserRepository from './userRepository';

describe('UserRepository', () => {
  let userRepository;

  beforeEach(() => {
    userRepository = new UserRepository();
  });

  describe('create', () => {
    it('should throw an error when called', () => {
      expect(() => userRepository.create()).toThrow('Not implemented');
    });
  });

  describe('findByEmail', () => {
    it('should throw an error when called', () => {
      expect(() => userRepository.findByEmail('test@example.com')).toThrow('Not implemented');
    });
  });
});

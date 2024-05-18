import CreateUserDTO from './createUserDto';

describe('CreateUserDTO', () => {
  describe('constructor', () => {
    it('should set email and password properties correctly', () => {
      const email = 'test@example.com';
      const password = 'password123';
      const createUserDTO = new CreateUserDTO({ email, password });

      expect(createUserDTO.email).toBe(email);
      expect(createUserDTO.password).toBe(password);
    });
  });
});

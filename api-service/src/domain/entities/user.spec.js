import User from './user.js';

describe('User Entity', () => {
  let user;
  const initialData = {
    id: '1',
    email: 'test@test.com',
    password: 'test123',
    role: 'user',
  };

  beforeAll(() => {
    jest.useFakeTimers('modern').setSystemTime(new Date(2024, 1, 1));

    user = new User(initialData);

    jest.useFakeTimers('modern').setSystemTime(new Date(2025, 1, 1));
  });

  afterAll(() => {
    jest.clearAllMocks()
  });

  it('should correctly set initial values through the constructor', () => {
    expect(user.id).toBe(initialData.id);
    expect(user.email).toBe(initialData.email);
    expect(user.password).toBe(initialData.password);
    expect(user.role).toBe(initialData.role);
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.updatedAt).toBeInstanceOf(Date);
    expect(user.createdAt).toEqual(user.updatedAt);
  });

  it('should update email and updatedAt when email is set', () => {
    const newEmail = 'newtest@test.com';
    user.email = newEmail;

    expect(user.email).toBe(newEmail);
    expect(user.updatedAt).not.toEqual(user.createdAt);
  });

  it('should update email and updatedAt when password is set', () => {
    const newPassword = 'new_password';
    user.password = newPassword;

    expect(user.password).toBe(newPassword);
    expect(user.updatedAt).not.toEqual(user.createdAt);
  });

  it('should update role and updatedAt when role is set', () => {
    const newRole = 'admin';
    user.role = newRole;

    expect(user.role).toBe(newRole);
    expect(user.updatedAt).not.toEqual(user.createdAt);
  });
})
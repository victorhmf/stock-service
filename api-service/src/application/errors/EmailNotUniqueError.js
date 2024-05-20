export class EmailNotUniqueError extends Error {
  constructor(
      message = 'This email is already in use.',
  ) {
    super(message);
    this.name = 'EmailNotUniqueError';
  }
}
import errorHandler from './errorHandler';
import logger from '../logger';

jest.mock('../logger');

describe('errorHandler', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    next = jest.fn();

    errorHandler(error, req, res, next);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const error = new Error('Internal Server Error.');
  const expectedErrorResponse = {
    message: 'Internal Server Error.',
    name: 'InternalServerError',
  };

  it('should log the error', () => {
    expect(logger.error).toHaveBeenCalledWith(error);
  });

  it('should return status 500', () => {
    expect(res.status).toHaveBeenCalledWith(500);
  });

  it('should return the error response in JSON format', () => {
    expect(res.json).toHaveBeenCalledWith(expectedErrorResponse);
  });

  it('should not call next', () => {
    expect(next).not.toHaveBeenCalled();
  });
});

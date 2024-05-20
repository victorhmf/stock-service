import errorHandler from './errorHandler';
import { EmailNotUniqueError } from '../../application/errors/EmailNotUniqueError';
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
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when error is a known error', () => {
    const knownError = new EmailNotUniqueError('Email already exists');
    const expectedErrorResponse = {
      message: knownError.message,
      name: knownError.name,
      data: knownError.data || {},
    };

    beforeEach(() => {
      errorHandler(knownError, req, res, next);
    });

    it('should log the error', () => {
      expect(logger.error).toHaveBeenCalledWith(knownError);
    });

    it('should return status 400', () => {
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should return the error response in JSON format', () => {
      expect(res.json).toHaveBeenCalledWith(expectedErrorResponse);
    });

    it('should not call next', () => {
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('when error is not a known error', () => {
    const unknownError = new Error('Internal Server Error.');
    const expectedErrorResponse = {
      message: 'Internal Server Error.',
      name: 'InternalServerError',
    };

    beforeEach(() => {
      errorHandler(unknownError, req, res, next);
    });

    it('should log the error', () => {
      expect(logger.error).toHaveBeenCalledWith(unknownError);
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
});

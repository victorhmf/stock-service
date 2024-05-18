import AuthMiddleware from './authMiddleware';
import jwt from 'jsonwebtoken';
import logger from '../logger';

jest.mock('jsonwebtoken');
jest.mock('../logger');

describe('AuthMiddleware', () => {
  let authMiddleware;
  let req;
  let res;
  let next;

  beforeEach(() => {
    authMiddleware = AuthMiddleware;
    req = {
      headers: {
        authorization: 'Bearer token123',
      },
    };
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('authenticate', () => {
    const decodedUser = { id: 'user123', role: 'admin' };

    describe('when token is valid', () => {
      beforeEach(() => {
        jwt.verify.mockReturnValue(decodedUser);
        authMiddleware.authenticate(req, res, next);
      });

      it('should verify the token', () => {
        expect(jwt.verify).toHaveBeenCalledWith('token123', process.env.SECRET_KEY);
      });

      it('should set user in request', () => {
        expect(req.user).toEqual(decodedUser);
      });

      it('should call next', () => {
        expect(next).toHaveBeenCalled();
      });
    });

    describe('when token is not provided', () => {
      beforeEach(() => {
        req.headers.authorization = undefined;
        authMiddleware.authenticate(req, res, next);
      });

      it('should log the error', () => {
        expect(logger.error).toHaveBeenCalledWith(new Error('Invalid Token'));
      });

      it('should return status 401', () => {
        expect(res.status).toHaveBeenCalledWith(401);
      });

      it('should return "Unauthorized" message', () => {
        expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized' });
      });
    });

    describe('when token is invalid', () => {
      beforeEach(() => {
        jwt.verify.mockImplementation(() => {
          throw new Error('Invalid token');
        });
        authMiddleware.authenticate(req, res, next);
      });

      it('should log the error', () => {
        expect(logger.error).toHaveBeenCalledWith(new Error('Invalid token'));
      });

      it('should return status 401', () => {
        expect(res.status).toHaveBeenCalledWith(401);
      });

      it('should return "Unauthorized" message', () => {
        expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized' });
      });
    });
  });

  describe('authorize', () => {
    describe('when user is admin', () => {
      beforeEach(() => {
        req.user = { role: 'admin' };
        authMiddleware.authorize(req, res, next);
      });

      it('should call next', () => {
        expect(next).toHaveBeenCalled();
      });
    });

    describe('when user is not admin', () => {
      beforeEach(() => {
        req.user = { role: 'user' };
        authMiddleware.authorize(req, res, next);
      });

      it('should return status 403', () => {
        expect(res.status).toHaveBeenCalledWith(403);
      });

      it('should return "Forbidden" message', () => {
        expect(res.json).toHaveBeenCalledWith({ message: 'Forbidden' });
      });
    });
  });
});

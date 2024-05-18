import request from 'supertest';
import app from '../../../infrastructure/webserver/app';
import cleanUpDatabase from '../../cleanUpDatabase';

jest.mock("../../../interfaces/logger")

describe('UserController', () => {
  afterAll(async () => {
    await cleanUpDatabase()
  });

  describe('#create', () => {
    describe('when a user is created successfully', () => {
      let response;

      beforeAll(async () => {
        response = await request(app)
          .post('/register')
          .send({
            email: 'test@example.com',
            role: 'user',
          })
      });

      it('should return status code 200', () => {
        expect(response.status).toBe(200);
      });

      it('should return correct data', () => {
        expect(response.body.email).toBe('test@example.com');
        expect(response.body).toHaveProperty('password');
      });
    });

    describe('when user creation fails', () => {
      let response;

      beforeAll(async () => {
        response = await request(app)
          .post('/register')
          .send({
            role: 'user',
          })
      });

      it('should return status code 500', () => {
        expect(response.status).toBe(500);
      });

      it('should handle errors', () => {
        expect(response.body).toHaveProperty('name', 'InternalServerError');
      });
    });
  });
});

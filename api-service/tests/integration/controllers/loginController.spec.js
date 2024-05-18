import request from 'supertest';
import app from '../../../infrastructure/webserver/app';
import cleanUpDatabase from '../../cleanUpDatabase';
import { createUser } from '../../factories/user';

jest.mock("../../../interfaces/logger")

describe('UserController', () => {
  let response;

  afterAll(async () => {
    await cleanUpDatabase()
  });

  describe('#login', () => {
    describe('on success', () => {
      beforeAll(async () => {
        const email = 'test@example.com'
        const role = 'user'
        const user = await createUser({ email, role })

        response = await request(app)
          .post('/login')
          .send({
            email,
            password: user.password
          })
      });

      it('should return status code 200', () => {
        expect(response.status).toBe(200);
      });

      it('should return accessToken', () => {
        expect(response.body).toHaveProperty('accessToken');
      });
    });

    describe('on fail', () => {
      describe('with invalid credentials', () => {
        beforeAll(async () => {
          const email = 'test@example.com'
          const password = 'invalid-password'

          response = await request(app)
            .post('/login')
            .send({
              email,
              password
            })
        });

        it('should return status code 401', () => {
          expect(response.status).toBe(401);
          expect(response.body).toHaveProperty('message', 'Invalid credentials.');
        });
      });

      describe('with any error', () => {
        beforeAll(async () => {
          const email = 'test@example.com'
          const password = 'invalid-password'

          response = await request(app)
            .post('/login')
            .send({
              // email,
              // password
            })
        });

        it('should return status code 500', () => {
          expect(response.status).toBe(500);
          expect(response.body).toHaveProperty('name', 'InternalServerError');
        });
      });
    });
  });
});

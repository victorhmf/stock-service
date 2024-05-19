import request from 'supertest';
import app from '../../../src/infrastructure/webserver/app';
import { cleanUpDB, disconnectDB } from '../../testUtils';
import { createUser } from '../../factories/user';

jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockResolvedValue(),
  })
}))

describe('UserController', () => {
  let response;

  afterAll(async () => {
    await disconnectDB()
  });

  describe('#create', () => {
    afterAll(async () => {
      await cleanUpDB()
    });

    describe('on success', () => {
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

    describe('on fail', () => {
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

  describe('#resetPassword', () => {
    afterAll(async () => {
      await cleanUpDB()
    });

    describe('on success', () => {
      beforeAll(async () => {
        const email = 'test@example.com'
        const role = 'user'
        await createUser({ email, role })

        response = await request(app)
          .post('/resetPassword')
          .send({
            email: 'test@example.com',
          })
      });

      it('should return status code 200', () => {
        expect(response.status).toBe(200);
      });

      it('should render correct message', () => {
        expect(response.body).toHaveProperty('message', 'You will receive an email with your new password.');
      });
    });

    describe('on fail', () => {
      describe('when user does not exists', () => {
        beforeAll(async () => {
          response = await request(app)
            .post('/resetPassword')
            .send({
              email: 'testx@example.com',
            })
        });

        it('should return status code 400', () => {
          expect(response.status).toBe(400);
        });

        it('should handle errors', () => {
          expect(response.body).toHaveProperty('name', 'UserNotFound');
        });
      });
    });
  });
});

import express from 'express';
import { makeUserController } from '../controllers/factories/userControllerFactory.js';
import { makeLoginController } from '../controllers/factories/loginControllerFactory.js';

const router = express.Router();
const userController = makeUserController()

router.post('/register', (req, res, next) => {
  /*
     #swagger.tags = ['Users']
     #swagger.summary = 'Register a new user'
     #swagger.description = 'This endpoint will create a new user with the provided email and role.'
     #swagger.requestBody = {
         required: true,
         content: {
             'application/json': {
                 schema: {
                     type: 'object',
                     properties: {
                         email: {
                             type: 'string',
                             example: 'user@example.com'
                         },
                         role: {
                             type: 'string',
                             example: 'user'
                         }
                     }
                 }
             }
         }
     }
     #swagger.responses[200] = {
         description: 'The created user object',
         content: {
             'application/json': {
                 schema: {
                     type: 'object',
                     properties: {
                         email: {
                             type: 'string',
                             example: 'user@example.com'
                         },
                         password: {
                             type: 'string',
                             example: 'some password'
                         }
                     }
                 }
             }
         }
     }
     #swagger.responses[400] = {
         description: 'Validation Error',
     }
     #swagger.responses[500] = {
         description: 'Internal server error'
     }
   */
  return userController.create(req, res, next)
})

router.post('/login', (req, res, next) => {
  /*
      #swagger.tags = ['Users']
      #swagger.summary = 'Login'
      #swagger.description = 'Authenticate a user with the provided email and password.'
      #swagger.requestBody = {
          required: true,
          content: {
              'application/json': {
                  schema: {
                      type: 'object',
                      properties: {
                          email: {
                              type: 'string',
                              example: 'user@example.com'
                          },
                          password: {
                              type: 'string',
                              example: 'password123'
                          }
                      }
                  }
              }
          }
      }
      #swagger.responses[200] = {
          description: 'Success',
          content: {
              'application/json': {
                  schema: {
                      type: 'object',
                      properties: {
                          accessToken: {
                              type: 'string',
                              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGV4YW1wbGUuY29tIiwiaWF0IjoxNTE2MjM5MDIyfQ.X3cMWeUy-BW6bYLufXO9xvQnmJ9b2s1-j-f4IglzQkE'
                          }
                      }
                  }
              }
          }
      }
      #swagger.responses[401] = {
          description: 'Invalid credentials'
      }
      #swagger.responses[500] = {
          description: 'Internal server error'
      }
 */
  return makeLoginController().login(req, res, next)
});

router.put('/resetPassword', (req, res, next) => {
  /*
     #swagger.tags = ['Users']
     #swagger.summary = 'Reset Password'
     #swagger.description = 'Reset the password for the user with the provided email.'
     #swagger.requestBody = {
         required: true,
         content: {
             'application/json': {
                 schema: {
                     type: 'object',
                     properties: {
                         email: {
                             type: 'string',
                             example: 'user@example.com'
                         }
                     }
                 }
             }
         }
     }
     #swagger.responses[200] = {
         description: 'Success',
         content: {
             'application/json': {
                 schema: {
                     type: 'object',
                     properties: {
                         message: {
                             type: 'string',
                             example: 'You will receive an email with your new password.'
                         }
                     }
                 }
             }
         }
     }
     #swagger.responses[500] = {
         description: 'Internal server error'
     }
  */
  return userController.resetPassword(req, res, next);
})

export default router;

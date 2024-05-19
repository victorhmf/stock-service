import express from 'express';
import { makeUserController } from '../controllers/factories/userControllerFactory.js';
import { makeLoginController } from '../controllers/factories/loginControllerFactory.js';

const router = express.Router();
const userController = makeUserController()

router.post('/register', (req, res, next) => userController.create(req, res, next));
router.post('/resetPassword', (req, res, next) => userController.resetPassword(req, res, next));
router.post('/login', (req, res, next) => makeLoginController().login(req, res, next));

export default router;

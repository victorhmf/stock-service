import express from 'express';
import { makeUserController } from '../controllers/factories/userControllerFactory.js';
import { makeLoginController } from '../controllers/factories/loginControllerFactory.js';

const router = express.Router();

router.post('/login', (req, res, next) => makeLoginController().login(req, res, next));
router.post('/register', (req, res, next) => makeUserController().create(req, res, next));

export default router;

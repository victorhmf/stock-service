import express from 'express';
import { makeUserController } from '../controllers/factories/userControllerFactory.js';

const router = express.Router();

router.post('/register', (req, res, next) => makeUserController().create(req, res, next));

export default router;

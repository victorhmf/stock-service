import express from 'express';
import { makeUserController } from '../controllers/factories/userControllerFactory.js';

const router = express.Router();

router.post('/register', (req, res) => makeUserController().create(req, res));

export default router;

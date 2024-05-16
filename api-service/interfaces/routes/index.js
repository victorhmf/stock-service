import express from 'express';
import { makeUserController } from '../controllers/factories/userControllerFactory.js';
import { makeLoginController } from '../controllers/factories/loginControllerFactory.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';
import { makeStockController } from '../controllers/factories/stockControllerFactory.js';

const router = express.Router();

router.post('/login', (req, res, next) => makeLoginController().login(req, res, next));
router.post('/register', (req, res, next) => makeUserController().create(req, res, next));

router.use(AuthMiddleware.authenticate);

router.get('/stock', (req, res, next) => makeStockController().getStock(req, res, next))
router.get('/history', (req, res, next) => makeStockController().getStockHistory(req, res, next))

export default router;

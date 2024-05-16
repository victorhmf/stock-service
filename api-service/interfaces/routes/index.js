import express from 'express';
import { makeUserController } from '../controllers/factories/userControllerFactory.js';
import { makeLoginController } from '../controllers/factories/loginControllerFactory.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';
import { makeStockController } from '../controllers/factories/stockControllerFactory.js';

const router = express.Router();

router.post('/login', (req, res, next) => makeLoginController().login(req, res, next));
router.post('/register', (req, res, next) => makeUserController().create(req, res, next));

router.use(AuthMiddleware.authenticate);

const stockController = makeStockController()

router.get('/stock', (req, res, next) => stockController.getStock(req, res, next))
router.get('/history', (req, res, next) => stockController.getStockHistory(req, res, next))

router.use(AuthMiddleware.authorize);
router.get('/stats', (req, res, next) => stockController.getStockStats(req, res, next))

export default router;

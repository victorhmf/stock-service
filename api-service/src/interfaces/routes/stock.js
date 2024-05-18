import express from 'express';
import AuthMiddleware from '../middlewares/authMiddleware.js';
import { makeStockController } from '../controllers/factories/stockControllerFactory.js';

const router = express.Router();

router.use(AuthMiddleware.authenticate);

const stockController = makeStockController()

router.get('/stock', (req, res, next) => stockController.getStock(req, res, next))
router.get('/history', (req, res, next) => stockController.getStockHistory(req, res, next))

router.use(AuthMiddleware.authorize);
router.get('/stats', (req, res, next) => stockController.getStockStats(req, res, next))

export default router;

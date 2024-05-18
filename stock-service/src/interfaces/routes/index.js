import express from 'express';
import { makeStockController } from '../controllers/factories/stockControllerFactory.js';

const router = express.Router();

router.get('/stock', (req, res, next) => makeStockController().getStock(req, res, next))

export default router;
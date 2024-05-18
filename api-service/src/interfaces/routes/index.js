import express from 'express';
import userRouter from './user.js'
import stockRouter from './stock.js'

const router = express.Router();

router.use(userRouter)
router.use(stockRouter)

export default router;

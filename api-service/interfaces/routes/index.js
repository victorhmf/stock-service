import express from 'express';
import { makeUserController } from '../controllers/factories/userControllerFactory.js';
import { makeLoginController } from '../controllers/factories/loginControllerFactory.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/login', (req, res, next) => makeLoginController().login(req, res, next));
router.post('/register', (req, res, next) => makeUserController().create(req, res, next));

router.use(AuthMiddleware.authenticate);

// router.get('/test', (req, res, next) => {
//   console.log(req.user)
//   res.status(200).json({})
// })

export default router;

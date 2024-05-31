import { AuthController } from '../controllers/auth.controller';
import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import { UserController } from '../controllers/user.controller';

const router = Router();

router.get('/issue-token', AuthController.issue);
router.get('/user', [authMiddleware], UserController.findByAccountOrIdentity);
router.post('/user', [authMiddleware], UserController.create);
router.get('/user/:id', [authMiddleware], UserController.findById);
router.patch('/user/:id', [authMiddleware], UserController.update);
router.delete('/user/:id', [authMiddleware], UserController.destroy);
router.get('/users', [authMiddleware], UserController.find);

export default router;

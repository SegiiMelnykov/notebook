import Router from 'express';
import ProfileController from '../controllers/profileController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.get('/:id', authMiddleware, ProfileController.get);
router.put('/:id', authMiddleware, ProfileController.update);
export default router;

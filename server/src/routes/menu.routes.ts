import express from 'express';
import {
  getAllMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from '../controllers/menu.controller';
import { auth, adminAuth } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/', getAllMenuItems);
router.get('/:id', getMenuItem);
router.post('/', adminAuth, createMenuItem);
router.put('/:id', adminAuth, updateMenuItem);
router.delete('/:id', adminAuth, deleteMenuItem);

export default router;
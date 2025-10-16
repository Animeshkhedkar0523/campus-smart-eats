import express from 'express';
import {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
} from '../controllers/order.controller';
import { auth, adminAuth } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/', auth, createOrder);
router.get('/user', auth, getUserOrders);
router.get('/:id', auth, getOrderById);
router.put('/:id/status', adminAuth, updateOrderStatus);

export default router;
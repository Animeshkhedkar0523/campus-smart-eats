import express from 'express';
import {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  getAllOrders,
  getOrderStats,
} from '../controllers/order.controller';
import { auth, adminAuth } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/', auth, createOrder);
router.get('/user', auth, getUserOrders);
router.get('/admin/all', adminAuth, getAllOrders);
router.get('/admin/stats', adminAuth, getOrderStats);
router.get('/:id', auth, getOrderById);
router.put('/:id/status', adminAuth, updateOrderStatus);

export default router;
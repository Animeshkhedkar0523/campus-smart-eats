import express from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  clearCart,
} from '../controllers/cart.controller';
import { auth } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/', auth, getCart);
router.post('/add', auth, addToCart);
router.put('/update', auth, updateCartItem);
router.delete('/clear', auth, clearCart);

export default router;
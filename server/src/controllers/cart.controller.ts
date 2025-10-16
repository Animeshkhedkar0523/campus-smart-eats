import { Response } from 'express';
import Cart from '../models/cart.model';
import { AuthRequest } from '../middleware/auth.middleware';

export const getCart = async (req: AuthRequest, res: Response) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate('items.menuItem');
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
      await cart.save();
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching cart' });
  }
};

export const addToCart = async (req: AuthRequest, res: Response) => {
  try {
    const { menuItemId, quantity } = req.body;
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        items: [{ menuItem: menuItemId, quantity }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        item => item.menuItem.toString() === menuItemId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ menuItem: menuItemId, quantity });
      }
    }

    await cart.save();
    await cart.populate('items.menuItem');
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Error adding item to cart' });
  }
};

export const updateCartItem = async (req: AuthRequest, res: Response) => {
  try {
    const { menuItemId, quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(
      item => item.menuItem.toString() === menuItemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }

    if (quantity === 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();
    await cart.populate('items.menuItem');
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Error updating cart item' });
  }
};

export const clearCart = async (req: AuthRequest, res: Response) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    cart.items = [];
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Error clearing cart' });
  }
};
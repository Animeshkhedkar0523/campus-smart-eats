import { Request, Response } from 'express';
import Order from '../models/order.model';
import { AuthRequest } from '../middleware/auth.middleware';

export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    const order = new Order({
      ...req.body,
      user: req.user._id,
    });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error creating order' });
  }
};

export const getUserOrders = async (req: AuthRequest, res: Response) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.menuItem')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching orders' });
  }
};

export const getOrderById = async (req: AuthRequest, res: Response) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate('items.menuItem');
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching order' });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error updating order status' });
  }
};
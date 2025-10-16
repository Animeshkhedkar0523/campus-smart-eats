import mongoose from 'mongoose';

export interface IOrder {
  user: mongoose.Types.ObjectId;
  items: {
    menuItem: mongoose.Types.ObjectId;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'completed' | 'failed';
}

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [{
    menuItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MenuItem',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
    },
  }],
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'preparing', 'ready', 'delivered', 'cancelled'],
    default: 'pending',
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
  },
}, { timestamps: true });

export default mongoose.model<IOrder>('Order', orderSchema);
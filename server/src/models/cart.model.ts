import mongoose from 'mongoose';

export interface ICart {
  user: mongoose.Types.ObjectId;
  items: {
    menuItem: mongoose.Types.ObjectId;
    quantity: number;
  }[];
}

const cartSchema = new mongoose.Schema({
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
  }],
}, { timestamps: true });

export default mongoose.model<ICart>('Cart', cartSchema);
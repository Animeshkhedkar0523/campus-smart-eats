import mongoose from 'mongoose';

export interface IMenuItem {
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
}

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

export default mongoose.model<IMenuItem>('MenuItem', menuItemSchema);
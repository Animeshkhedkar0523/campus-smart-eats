import dotenv from 'dotenv';
import mongoose from 'mongoose';
import MenuItem from '../models/menuItem.model';

dotenv.config();

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/campus_smart_eats';

const menuItems = [
  {
    name: "Special Thali",
    description: "Rice, Dal, 2 Sabzi, Roti, Salad, Sweet",
    price: 80,
    category: "lunch",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400",
    available: true,
  },
  {
    name: "Idli Vada Combo",
    description: "3 Idli, 1 Vada with Sambar & Chutney",
    price: 50,
    category: "breakfast",
    image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400",
    available: true,
  },
  {
    name: "Masala Dosa",
    description: "Crispy dosa with potato filling",
    price: 60,
    category: "breakfast",
    image: "https://images.unsplash.com/photo-1694809413149-d3e3c9c9d5c4?w=400",
    available: true,
  },
  {
    name: "Poha",
    description: "Flattened rice with peanuts and spices",
    price: 30,
    category: "breakfast",
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=400",
    available: true,
  },
  {
    name: "Paneer Thali",
    description: "Rice, Dal, Paneer Sabzi, Roti, Salad",
    price: 100,
    category: "lunch",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400",
    available: true,
  },
  {
    name: "Veg Biryani",
    description: "Aromatic rice with mixed vegetables",
    price: 90,
    category: "lunch",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400",
    available: true,
  },
  {
    name: "Dal Khichdi",
    description: "Comfort food with dal and rice",
    price: 60,
    category: "lunch",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400",
    available: true,
  },
  {
    name: "Samosa",
    description: "Crispy samosas with chutney (2 pieces)",
    price: 20,
    category: "snacks",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400",
    available: true,
  },
  {
    name: "Vada Pav",
    description: "Mumbai special potato fritter in bun",
    price: 25,
    category: "snacks",
    image: "https://images.unsplash.com/photo-1626266061368-46a8f578ddd6?w=400",
    available: true,
  },
  {
    name: "Pav Bhaji",
    description: "Spicy mashed vegetables with buttered pav",
    price: 70,
    category: "snacks",
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400",
    available: true,
  },
  {
    name: "Pakora Platter",
    description: "Mixed vegetable fritters",
    price: 40,
    category: "snacks",
    image: "https://images.unsplash.com/photo-1643699395888-fbb691e6f770?w=400",
    available: true,
  },
  {
    name: "Fresh Juice",
    description: "Seasonal fruit juice",
    price: 40,
    category: "beverages",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400",
    available: true,
  },
  {
    name: "Masala Chai",
    description: "Hot Indian spiced tea",
    price: 15,
    category: "beverages",
    image: "https://images.unsplash.com/photo-1597318112024-dc3c608c6650?w=400",
    available: true,
  },
  {
    name: "Coffee",
    description: "Hot filter coffee",
    price: 20,
    category: "beverages",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400",
    available: true,
  },
  {
    name: "Lassi",
    description: "Sweet yogurt drink",
    price: 35,
    category: "beverages",
    image: "https://images.unsplash.com/photo-1623492229916-c7f4cebf7e5b?w=400",
    available: true,
  },
  {
    name: "Cold Drink",
    description: "Chilled soft drink",
    price: 30,
    category: "beverages",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400",
    available: true,
  },
];

const run = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB for seeding');

    // Clear existing menu items
    await MenuItem.deleteMany({});
    console.log('Cleared existing menu items');

    // Insert new menu items
    await MenuItem.insertMany(menuItems);
    console.log(`Seeded ${menuItems.length} menu items`);
    
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

run();

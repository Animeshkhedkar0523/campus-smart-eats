import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import thaliImage from "@/assets/food-thali.jpg";
import breakfastImage from "@/assets/food-breakfast.jpg";
import snacksImage from "@/assets/food-snacks.jpg";
import beveragesImage from "@/assets/food-beverages.jpg";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  available: boolean;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Special Thali",
    description: "Rice, Dal, 2 Sabzi, Roti, Salad, Sweet",
    price: 80,
    category: "lunch",
    image: thaliImage,
    available: true,
  },
  {
    id: 2,
    name: "Idli Vada Combo",
    description: "3 Idli, 1 Vada with Sambar & Chutney",
    price: 50,
    category: "breakfast",
    image: breakfastImage,
    available: true,
  },
  {
    id: 3,
    name: "Samosa Platter",
    description: "Crispy samosas with chutney",
    price: 30,
    category: "snacks",
    image: snacksImage,
    available: true,
  },
  {
    id: 4,
    name: "Fresh Juice",
    description: "Seasonal fruit juice",
    price: 40,
    category: "beverages",
    image: beveragesImage,
    available: true,
  },
  {
    id: 5,
    name: "Masala Dosa",
    description: "Crispy dosa with potato filling",
    price: 60,
    category: "breakfast",
    image: breakfastImage,
    available: true,
  },
  {
    id: 6,
    name: "Paneer Thali",
    description: "Rice, Dal, Paneer Sabzi, Roti, Salad",
    price: 100,
    category: "lunch",
    image: thaliImage,
    available: true,
  },
];

const Menu = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const addToCart = (item: MenuItem) => {
    toast({
      title: "Added to Cart",
      description: `${item.name} has been added to your cart`,
    });
  };

  const filteredItems = (category: string) => {
    return menuItems.filter(
      (item) =>
        item.category === category &&
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const FoodCard = ({ item }: { item: MenuItem }) => (
    <div className="group bg-card rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-all">
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {!item.available && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white font-semibold">Out of Stock</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
        <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary">₹{item.price}</span>
          <Button
            onClick={() => addToCart(item)}
            disabled={!item.available}
            size="sm"
            variant="default"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Our Menu</h1>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Tabs defaultValue="breakfast" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
            <TabsTrigger value="lunch">Lunch</TabsTrigger>
            <TabsTrigger value="snacks">Snacks</TabsTrigger>
            <TabsTrigger value="beverages">Beverages</TabsTrigger>
          </TabsList>

          <TabsContent value="breakfast" className="mt-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems("breakfast").map((item) => (
                <FoodCard key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="lunch" className="mt-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems("lunch").map((item) => (
                <FoodCard key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="snacks" className="mt-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems("snacks").map((item) => (
                <FoodCard key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="beverages" className="mt-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems("beverages").map((item) => (
                <FoodCard key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Menu;
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const updateQuantity = (id: number, delta: number) => {
    setCartItems((items) =>
      items
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
    toast({
      title: "Item Removed",
      description: "Item has been removed from your cart",
    });
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const handleCheckout = () => {
    toast({
      title: "Order Placed!",
      description: "Your order has been placed successfully",
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your Cart is Empty</h2>
          <p className="text-muted-foreground mb-6">
            Add some delicious items from our menu to get started!
          </p>
          <Button asChild variant="hero" size="lg">
            <Link to="/menu">Browse Menu</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Your Cart</h1>

        <div className="space-y-4 mb-8">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 p-4 bg-card rounded-2xl shadow-[var(--shadow-card)]"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-xl"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                <p className="text-primary font-bold">₹{item.price}</p>
              </div>
              <div className="flex flex-col items-end justify-between">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center font-semibold">
                    {item.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-[var(--shadow-card)] mb-6">
          <div className="space-y-3 mb-4">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Tax (5%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="border-t pt-3 flex justify-between text-xl font-bold">
              <span>Total</span>
              <span className="text-primary">₹{total.toFixed(2)}</span>
            </div>
          </div>
          <Button
            onClick={handleCheckout}
            variant="hero"
            size="lg"
            className="w-full"
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
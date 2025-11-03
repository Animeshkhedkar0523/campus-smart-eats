import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { cartAPI, orderAPI } from "@/services/api";

interface MenuItem {
  _id: string;
  name: string;
  price: number;
  image: string;
}

interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  _id: string;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await cartAPI.getCart();
      setCartItems(response.data.items || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load cart",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (menuItemId: string, newQuantity: number) => {
    try {
      const response = await cartAPI.updateCartItem(menuItemId, newQuantity);
      setCartItems(response.data.items || []);
      if (newQuantity === 0) {
        toast({
          title: "Item Removed",
          description: "Item has been removed from your cart",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update cart",
        variant: "destructive",
      });
    }
  };

  const removeItem = async (menuItemId: string) => {
    await updateQuantity(menuItemId, 0);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.menuItem.price * item.quantity,
    0
  );
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      const orderData = {
        items: cartItems.map(item => ({
          menuItem: item.menuItem._id,
          quantity: item.quantity,
          price: item.menuItem.price,
        })),
        totalAmount: total,
      };
      
      const response = await orderAPI.createOrder(orderData);
      await cartAPI.clearCart();
      
      toast({
        title: "Order Placed!",
        description: "Your order has been placed successfully",
      });
      navigate('/track');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to place order",
        variant: "destructive",
      });
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

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
              key={item._id}
              className="flex gap-4 p-4 bg-card rounded-2xl shadow-[var(--shadow-card)]"
            >
              <img
                src={item.menuItem.image}
                alt={item.menuItem.name}
                className="w-24 h-24 object-cover rounded-xl"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">{item.menuItem.name}</h3>
                <p className="text-primary font-bold">₹{item.menuItem.price}</p>
              </div>
              <div className="flex flex-col items-end justify-between">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.menuItem._id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.menuItem._id, item.quantity - 1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center font-semibold">
                    {item.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.menuItem._id, item.quantity + 1)}
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
            disabled={isCheckingOut}
          >
            {isCheckingOut ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Proceed to Checkout"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
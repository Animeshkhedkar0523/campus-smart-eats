import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Clock, Package, Utensils, Loader2, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import { orderAPI } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

interface OrderItem {
  menuItem: {
    _id: string;
    name: string;
    price: number;
  };
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  items: OrderItem[];
  totalAmount: number;
  status: "pending" | "preparing" | "ready" | "delivered" | "cancelled";
  createdAt: string;
}

const TrackOrder = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await orderAPI.getUserOrders();
      console.log('Orders fetched:', response.data);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const e = error as any;
      if (e?.response?.status === 401) {
        toast({
          title: 'Please sign in',
          description: 'You need to sign in to view your orders',
          variant: 'destructive',
        });
        navigate('/auth');
        return;
      }
      toast({
        title: "Error",
        description: "Failed to load orders",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "preparing":
        return <Utensils className="h-6 w-6" />;
      case "ready":
        return <Package className="h-6 w-6" />;
      case "completed":
        return <CheckCircle2 className="h-6 w-6" />;
      default:
        return <Clock className="h-6 w-6" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-muted text-muted-foreground";
      case "preparing":
        return "bg-accent text-accent-foreground";
      case "ready":
        return "bg-primary text-primary-foreground";
      case "delivered":
        return "bg-secondary text-secondary-foreground";
      case "cancelled":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Your Orders</h1>
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">No Orders Yet</h2>
          <p className="text-muted-foreground mb-6">
            You haven't placed any orders yet. Browse our menu to get started!
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
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Your Orders</h1>

        {orders.map((order) => (
          <Card key={order._id} className="mb-6 shadow-[var(--shadow-elevated)]">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl mb-2">Order #{order._id.slice(-8).toUpperCase()}</CardTitle>
                  <p className="text-muted-foreground">
                    {formatDate(order.createdAt)} at {formatTime(order.createdAt)}
                  </p>
                </div>
                <Badge className={getStatusColor(order.status)}>
                  {order.status.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Order Items */}
                <div>
                  <h3 className="font-semibold mb-3">Order Items</h3>
                  <ul className="space-y-2">
                    {order.items.map((item, index) => (
                      <li key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-secondary" />
                          <span>{item.menuItem.name}</span>
                          <span className="text-muted-foreground">x{item.quantity}</span>
                        </div>
                        <span className="font-medium">₹{item.price * item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Status Timeline */}
                <div>
                  <h3 className="font-semibold mb-4">Order Status</h3>
                  <div className="space-y-4">
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Order Confirmed</p>
                        <p className="text-sm text-muted-foreground">
                          Your order has been received
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          order.status === "preparing"
                            ? "bg-accent/20 text-accent animate-pulse"
                            : order.status === "ready" || order.status === "delivered"
                            ? "bg-secondary/20 text-secondary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <Utensils className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Preparing</p>
                        <p className="text-sm text-muted-foreground">
                          Your food is being prepared
                        </p>
                        {order.status === "preparing" && (
                          <p className="text-sm text-accent font-semibold mt-1">
                            Est. 15-20 min
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-4 items-start">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          order.status === "ready"
                            ? "bg-primary/20 text-primary animate-pulse"
                            : order.status === "delivered"
                            ? "bg-secondary/20 text-secondary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <Package className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Ready for Pickup</p>
                        <p className="text-sm text-muted-foreground">
                          Your order is ready to collect
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Total */}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span>Total Amount</span>
                    <span className="text-primary">₹{order.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <div className="text-center mt-6">
          <Button asChild variant="outline" size="lg">
            <Link to="/menu">Order More</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
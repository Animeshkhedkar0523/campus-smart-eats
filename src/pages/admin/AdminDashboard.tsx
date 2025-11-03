import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  ShoppingBag, 
  DollarSign, 
  Users, 
  TrendingUp,
  UtensilsCrossed,
  LogOut,
  Loader2,
  RefreshCw
} from "lucide-react";
import { orderAPI } from "@/services/api";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface OrderStats {
  todayOrders: number;
  todayRevenue: number;
  totalUsers: number;
  avgOrderValue: number;
}

interface Order {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  items: any[];
  totalAmount: number;
  status: string;
  createdAt: string;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<OrderStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, ordersRes] = await Promise.all([
        orderAPI.getOrderStats(),
        orderAPI.getAllOrders(),
      ]);
      setStats(statsRes.data);
      setRecentOrders(ordersRes.data.slice(0, 10)); // Get latest 10 orders
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    setUpdatingStatus(orderId);
    try {
      await orderAPI.updateOrderStatus(orderId, newStatus);
      // Update local state
      setRecentOrders(orders =>
        orders.map(order =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      toast({
        title: "Status Updated",
        description: "Order status has been updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive",
      });
    } finally {
      setUpdatingStatus(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-muted">Pending</Badge>;
      case "preparing":
        return <Badge className="bg-accent">Preparing</Badge>;
      case "ready":
        return <Badge className="bg-primary">Ready</Badge>;
      case "delivered":
        return <Badge className="bg-secondary">Delivered</Badge>;
      case "cancelled":
        return <Badge className="bg-destructive">Cancelled</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getNextStatus = (currentStatus: string): string | null => {
    const statusFlow = {
      pending: 'preparing',
      preparing: 'ready',
      ready: 'delivered',
    };
    return statusFlow[currentStatus as keyof typeof statusFlow] || null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const statsCards = [
    {
      title: "Today's Orders",
      value: stats?.todayOrders.toString() || "0",
      icon: ShoppingBag,
      color: "text-primary",
    },
    {
      title: "Today's Revenue",
      value: `₹${stats?.todayRevenue.toFixed(2) || "0"}`,
      icon: DollarSign,
      color: "text-secondary",
    },
    {
      title: "Total Users",
      value: stats?.totalUsers.toString() || "0",
      icon: Users,
      color: "text-accent",
    },
    {
      title: "Avg. Order Value",
      value: `₹${stats?.avgOrderValue.toFixed(2) || "0"}`,
      icon: TrendingUp,
      color: "text-primary",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
              <UtensilsCrossed className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={fetchDashboardData}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat) => (
            <Card key={stat.title} className="shadow-[var(--shadow-card)]">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Orders */}
        <Card className="shadow-[var(--shadow-elevated)]">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {recentOrders.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No orders yet
              </div>
            ) : (
              <div className="space-y-4">
                {recentOrders.map((order) => {
                  const nextStatus = getNextStatus(order.status);
                  return (
                    <div
                      key={order._id}
                      className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="font-semibold">Order #{order._id.slice(-8).toUpperCase()}</p>
                        <p className="text-sm text-muted-foreground">{order.user.name}</p>
                        <p className="text-xs text-muted-foreground">{order.user.email}</p>
                      </div>
                      <div className="text-center mx-4">
                        <p className="text-sm text-muted-foreground">{order.items.length} items</p>
                        <p className="font-semibold">₹{order.totalAmount.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(order.status)}
                        {nextStatus && order.status !== 'delivered' && order.status !== 'cancelled' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateOrderStatus(order._id, nextStatus)}
                            disabled={updatingStatus === order._id}
                          >
                            {updatingStatus === order._id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              `Mark ${nextStatus}`
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
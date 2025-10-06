import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  ShoppingBag, 
  DollarSign, 
  Users, 
  TrendingUp,
  Clock,
  CheckCircle,
  UtensilsCrossed,
  LogOut
} from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    {
      title: "Today's Orders",
      value: "45",
      icon: ShoppingBag,
      change: "+12%",
      color: "text-primary",
    },
    {
      title: "Revenue",
      value: "₹3,240",
      icon: DollarSign,
      change: "+8%",
      color: "text-secondary",
    },
    {
      title: "Active Users",
      value: "128",
      icon: Users,
      change: "+5%",
      color: "text-accent",
    },
    {
      title: "Avg. Order Value",
      value: "₹72",
      icon: TrendingUp,
      change: "+3%",
      color: "text-primary",
    },
  ];

  const recentOrders = [
    { id: "ORD-001", customer: "Rahul Sharma", items: 3, total: 150, status: "preparing" },
    { id: "ORD-002", customer: "Priya Patel", items: 2, total: 120, status: "ready" },
    { id: "ORD-003", customer: "Amit Kumar", items: 1, total: 80, status: "completed" },
    { id: "ORD-004", customer: "Sneha Gupta", items: 4, total: 200, status: "preparing" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "preparing":
        return <Badge className="bg-accent">Preparing</Badge>;
      case "ready":
        return <Badge className="bg-primary">Ready</Badge>;
      case "completed":
        return <Badge className="bg-secondary">Completed</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

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
          <Button variant="outline" size="sm">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title} className="shadow-[var(--shadow-card)]">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-secondary">{stat.change}</span> from yesterday
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Button asChild variant="default" size="lg" className="h-20">
            <Link to="/admin/orders">
              <Clock className="mr-2 h-5 w-5" />
              View All Orders
            </Link>
          </Button>
          <Button asChild variant="secondary" size="lg" className="h-20">
            <Link to="/admin/menu">
              <UtensilsCrossed className="mr-2 h-5 w-5" />
              Manage Menu
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-20">
            <Link to="/admin/reports">
              <TrendingUp className="mr-2 h-5 w-5" />
              View Reports
            </Link>
          </Button>
        </div>

        {/* Recent Orders */}
        <Card className="shadow-[var(--shadow-elevated)]">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
                >
                  <div>
                    <p className="font-semibold">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">{order.items} items</p>
                    <p className="font-semibold">₹{order.total}</p>
                  </div>
                  {getStatusBadge(order.status)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
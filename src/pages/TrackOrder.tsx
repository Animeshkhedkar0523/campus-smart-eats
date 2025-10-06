import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Clock, Package, Utensils } from "lucide-react";
import { Link } from "react-router-dom";

interface Order {
  id: string;
  items: string[];
  total: number;
  status: "preparing" | "ready" | "completed";
  estimatedTime: string;
  orderTime: string;
}

const mockOrder: Order = {
  id: "ORD-2024-001",
  items: ["Special Thali", "Fresh Juice"],
  total: 120,
  status: "preparing",
  estimatedTime: "15 min",
  orderTime: "12:30 PM",
};

const TrackOrder = () => {
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
      case "preparing":
        return "bg-accent text-accent-foreground";
      case "ready":
        return "bg-primary text-primary-foreground";
      case "completed":
        return "bg-secondary text-secondary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Track Your Order</h1>

        <Card className="mb-6 shadow-[var(--shadow-elevated)]">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl mb-2">Order #{mockOrder.id}</CardTitle>
                <p className="text-muted-foreground">
                  Placed at {mockOrder.orderTime}
                </p>
              </div>
              <Badge className={getStatusColor(mockOrder.status)}>
                {mockOrder.status.toUpperCase()}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Order Items */}
              <div>
                <h3 className="font-semibold mb-3">Order Items</h3>
                <ul className="space-y-2">
                  {mockOrder.items.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-secondary" />
                      <span>{item}</span>
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
                        mockOrder.status === "preparing"
                          ? "bg-accent/20 text-accent animate-pulse"
                          : "bg-secondary/20 text-secondary"
                      }`}
                    >
                      <Utensils className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Preparing</p>
                      <p className="text-sm text-muted-foreground">
                        Your food is being prepared
                      </p>
                      {mockOrder.status === "preparing" && (
                        <p className="text-sm text-accent font-semibold mt-1">
                          Est. {mockOrder.estimatedTime}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        mockOrder.status === "ready" || mockOrder.status === "completed"
                          ? "bg-primary/20 text-primary"
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
                  <span className="text-primary">₹{mockOrder.total}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/menu">Order More</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
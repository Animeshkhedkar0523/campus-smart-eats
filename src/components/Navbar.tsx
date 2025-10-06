import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { UtensilsCrossed, ShoppingCart, User, Home as HomeIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface NavbarProps {
  cartCount?: number;
}

const Navbar = ({ cartCount = 0 }: NavbarProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
            <UtensilsCrossed className="h-6 w-6 text-white" />
          </div>
          <span className="hidden sm:inline bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Campus Smart Eats
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Button 
            asChild 
            variant={isActive("/") ? "default" : "ghost"}
            size="sm"
          >
            <Link to="/">
              <HomeIcon className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Home</span>
            </Link>
          </Button>
          
          <Button 
            asChild 
            variant={isActive("/menu") ? "default" : "ghost"}
            size="sm"
          >
            <Link to="/menu">
              <UtensilsCrossed className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Menu</span>
            </Link>
          </Button>

          <Button 
            asChild 
            variant={isActive("/cart") ? "cart" : "ghost"}
            size="sm"
            className="relative"
          >
            <Link to="/cart">
              <ShoppingCart className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {cartCount}
                </Badge>
              )}
            </Link>
          </Button>

          <Button 
            asChild 
            variant={isActive("/auth") ? "secondary" : "outline"}
            size="sm"
          >
            <Link to="/auth">
              <User className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Login</span>
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
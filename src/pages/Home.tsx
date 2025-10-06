import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { UtensilsCrossed, Clock, ShoppingBag, Star } from "lucide-react";
import heroImage from "@/assets/hero-campus.jpg";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/80"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            Campus Smart Eats
          </h1>
          <p className="text-xl md:text-2xl text-white/95 mb-8 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-150">
            Delicious meals, delivered fresh to your campus at MIT-ADT University
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
            <Button asChild variant="hero" size="lg">
              <Link to="/menu">
                <UtensilsCrossed className="mr-2 h-5 w-5" />
                Browse Menu
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90">
              <Link to="/track">
                <Clock className="mr-2 h-5 w-5" />
                Track Order
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-card to-card/50 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-all">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quick Service</h3>
              <p className="text-muted-foreground">
                Order ready in 15-20 minutes. Track your order in real-time.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-card to-card/50 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-all">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <UtensilsCrossed className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Fresh & Tasty</h3>
              <p className="text-muted-foreground">
                Made fresh daily with quality ingredients from trusted sources.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-card to-card/50 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-all">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy Payment</h3>
              <p className="text-muted-foreground">
                Secure UPI payments. Quick checkout with multiple options.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Popular Categories</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Breakfast", icon: "🌅" },
              { name: "Lunch", icon: "🍱" },
              { name: "Snacks", icon: "🍟" },
              { name: "Beverages", icon: "☕" },
            ].map((category) => (
              <Link 
                key={category.name}
                to="/menu"
                className="group p-6 rounded-2xl bg-card shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-all hover:scale-105"
              >
                <div className="text-5xl mb-3 text-center">{category.icon}</div>
                <h3 className="text-xl font-semibold text-center group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Star className="h-16 w-16 text-accent mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">Ready to Order?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join hundreds of students enjoying fresh, delicious meals every day
          </p>
          <Button asChild variant="hero" size="lg">
            <Link to="/menu">
              Start Ordering Now
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
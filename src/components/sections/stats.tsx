import { Users, ShoppingBag, DollarSign, Star } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "50K+",
    label: "Active Creators",
    description: "Building the future"
  },
  {
    icon: ShoppingBag,
    value: "125K+",
    label: "Digital Products",
    description: "Ready to purchase"
  },
  {
    icon: DollarSign,
    value: "$2.5M+",
    label: "Creator Earnings",
    description: "Paid out monthly"
  },
  {
    icon: Star,
    value: "4.9/5",
    label: "Average Rating",
    description: "Customer satisfaction"
  }
];

export function StatsSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-20" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Trusted by <span className="gradient-text">Thousands</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join a thriving ecosystem of AI creators and innovators building the next generation of digital products.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-surface-elevated border border-border rounded-2xl p-8 hover-glow transition-all duration-300 group-hover:border-primary/30">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-2xl mb-6 animate-glow">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                
                <div className="text-4xl md:text-5xl font-black mb-2 gradient-text">
                  {stat.value}
                </div>
                
                <div className="text-lg font-semibold mb-2">
                  {stat.label}
                </div>
                
                <div className="text-sm text-muted-foreground">
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
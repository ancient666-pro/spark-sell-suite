import { ProductCard } from "@/components/ui/product-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const featuredProducts = [
  {
    id: "1",
    title: "GPT-4 Creative Writing Assistant",
    description: "Transform your writing with AI-powered creativity prompts for novels, scripts, and content creation.",
    price: 29.99,
    rating: 4.9,
    downloads: 1247,
    category: "prompt" as const,
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop",
    seller: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b131?w=100&h=100&fit=crop&crop=face"
    }
  },
  {
    id: "2", 
    title: "E-commerce Automation Suite",
    description: "Complete n8n workflow for automating order processing, inventory management, and customer notifications.",
    price: 89.99,
    rating: 4.8,
    downloads: 523,
    category: "agent" as const,
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop",
    seller: {
      name: "Marcus Developer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    }
  },
  {
    id: "3",
    title: "Social Media Growth Prompts",
    description: "50+ proven prompts for creating viral content across Instagram, TikTok, and LinkedIn.",
    price: 19.99,
    rating: 4.7,
    downloads: 2156,
    category: "prompt" as const,
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
    seller: {
      name: "Alex Rodriguez",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    }
  },
  {
    id: "4",
    title: "Lead Generation Bot",
    description: "Advanced n8n automation for finding, qualifying, and nurturing B2B leads across multiple platforms.",
    price: 149.99,
    rating: 4.9,
    downloads: 312,
    category: "agent" as const,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    seller: {
      name: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
  }
];

export function FeaturedProducts() {
  const navigate = useNavigate();
  return (
    <section className="py-20 bg-surface">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Trending Now</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Featured</span> Products
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the most popular and highest-rated digital products from our creator community.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {featuredProducts.map((product, index) => (
            <div 
              key={product.id} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="btn-primary px-8"
            onClick={() => navigate('/marketplace')}
          >
            View All Products
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
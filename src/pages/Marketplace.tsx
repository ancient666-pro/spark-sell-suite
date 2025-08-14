import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { ProductCard } from "@/components/ui/product-card";
import { Button } from "@/components/ui/button";
import { Filter, SlidersHorizontal, Grid3X3, List } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const sampleProducts = [
  {
    id: "1",
    title: "Advanced ChatGPT Prompts for Content Creation",
    description: "100+ proven prompts for blog posts, social media, and marketing copy that converts.",
    price: 39.99,
    rating: 4.9,
    downloads: 2341,
    category: "prompt" as const,
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop",
    seller: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b131?w=100&h=100&fit=crop&crop=face"
    }
  },
  {
    id: "2",
    title: "Complete E-commerce Automation Workflow",
    description: "Full n8n setup for order processing, inventory tracking, and customer communication.",
    price: 149.99,
    rating: 4.8,
    downloads: 623,
    category: "agent" as const,
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop",
    seller: {
      name: "Marcus Developer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    }
  },
  {
    id: "3",
    title: "Social Media Viral Content Templates",
    description: "Templates and prompts that generated 10M+ views across platforms.",
    price: 24.99,
    rating: 4.7,
    downloads: 3156,
    category: "prompt" as const,
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
    seller: {
      name: "Alex Rodriguez",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    }
  },
  {
    id: "4",
    title: "AI-Powered Lead Generation System",
    description: "Automated prospect finding and outreach system using n8n and multiple data sources.",
    price: 199.99,
    rating: 4.9,
    downloads: 412,
    category: "agent" as const,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    seller: {
      name: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
  },
  {
    id: "5",
    title: "Midjourney Prompt Engineering Masterclass",
    description: "Professional techniques for creating stunning AI art with optimized prompts.",
    price: 59.99,
    rating: 4.8,
    downloads: 1823,
    category: "prompt" as const,
    image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop",
    seller: {
      name: "Digital Artist Pro",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"
    }
  },
  {
    id: "6",
    title: "Customer Service Automation Bot",
    description: "24/7 customer support system with intelligent routing and response generation.",
    price: 129.99,
    rating: 4.6,
    downloads: 245,
    category: "agent" as const,
    image: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=400&h=300&fit=crop",
    seller: {
      name: "Bot Builder",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop&crop=face"
    }
  }
];

export default function Marketplace() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("popular");

  const filteredProducts = sampleProducts.filter(product => {
    if (selectedCategory === "all") return true;
    return product.category === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Page Header */}
      <div className="pt-20 pb-12 bg-surface border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Marketplace</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Discover premium AI prompts, automation agents, and digital goods from expert creators worldwide.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12">
        {/* Filters and Controls */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px] bg-surface">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="prompt">AI Prompts</SelectItem>
                <SelectItem value="agent">n8n Agents</SelectItem>
                <SelectItem value="other">Digital Goods</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort Filter */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] bg-surface">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-4">
            {/* Results Count */}
            <span className="text-muted-foreground">
              {filteredProducts.length} products found
            </span>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-surface rounded-lg p-1 border border-border">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-primary text-primary-foreground" : ""}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-primary text-primary-foreground" : ""}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-8 ${
          viewMode === "grid" 
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
            : "grid-cols-1"
        }`}>
          {filteredProducts.map((product, index) => (
            <div 
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-16">
          <Button size="lg" className="btn-primary px-8">
            Load More Products
          </Button>
        </div>
      </div>
    </div>
  );
}
import { Star, Download, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  downloads: number;
  category: "prompt" | "agent" | "other";
  image: string;
  seller: {
    name: string;
    avatar: string;
  };
}

export function ProductCard({ 
  title, 
  description, 
  price, 
  rating, 
  downloads, 
  category, 
  image, 
  seller 
}: ProductCardProps) {
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "prompt":
        return "bg-primary/10 text-primary border-primary/20";
      case "agent":
        return "bg-accent/10 text-accent border-accent/20";
      default:
        return "bg-secondary/10 text-secondary-foreground border-secondary/20";
    }
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case "prompt":
        return "AI Prompt";
      case "agent":
        return "n8n Agent";
      default:
        return "Digital Good";
    }
  };

  return (
    <div className="group bg-card border border-border rounded-xl overflow-hidden card-hover hover-glow">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Floating Actions */}
        <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button size="icon" variant="secondary" className="h-8 w-8 backdrop-blur-sm">
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <Badge className={getCategoryColor(category)}>
            {getCategoryLabel(category)}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title and Description */}
        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {description}
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
              <span>{rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Download className="h-4 w-4" />
              <span>{downloads}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">${price}</div>
          </div>
        </div>

        {/* Seller */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img
              src={seller.avatar}
              alt={seller.name}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm text-muted-foreground">{seller.name}</span>
          </div>
          <Button size="sm" className="btn-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
}
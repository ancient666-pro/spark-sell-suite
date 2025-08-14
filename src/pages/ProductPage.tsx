import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Download, Heart, Share2, ShoppingCart, Shield, Clock, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProductPage() {
  const product = {
    id: "1",
    title: "Advanced ChatGPT Prompts for Content Creation",
    description: "Transform your content creation workflow with this comprehensive collection of 100+ professionally crafted ChatGPT prompts. Perfect for bloggers, marketers, copywriters, and content creators who want to leverage AI for consistent, high-quality output.",
    fullDescription: `
This extensive prompt library includes:

• **Blog Content Prompts**: 25 prompts for engaging blog posts, tutorials, and thought leadership pieces
• **Social Media Prompts**: 30 prompts for viral posts across Instagram, Twitter, LinkedIn, and TikTok  
• **Marketing Copy Prompts**: 20 prompts for sales pages, email campaigns, and ad copy that converts
• **Creative Writing Prompts**: 15 prompts for storytelling, character development, and narrative creation
• **SEO-Optimized Prompts**: 10 prompts specifically designed for search engine optimization

Each prompt has been tested with thousands of content creators and refined for maximum effectiveness. You'll also get:

- Step-by-step usage instructions
- Real examples and case studies  
- Customization tips for your niche
- Bonus: 5 advanced prompt engineering techniques
- Regular updates with new prompts

Perfect for entrepreneurs, agencies, freelancers, and anyone looking to scale their content production while maintaining quality.
    `,
    price: 39.99,
    originalPrice: 59.99,
    rating: 4.9,
    reviewCount: 247,
    downloads: 2341,
    category: "AI Prompt",
    tags: ["ChatGPT", "Content Creation", "Marketing", "Copywriting", "Social Media"],
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=600&fit=crop",
    seller: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b131?w=100&h=100&fit=crop&crop=face",
      verified: true,
      rating: 4.8,
      totalSales: 1250,
      responseTime: "2 hours"
    },
    features: [
      "100+ Professional Prompts",
      "Detailed Usage Instructions",
      "Real-world Examples",
      "Lifetime Access",
      "Regular Updates",
      "30-Day Money Back Guarantee"
    ],
    lastUpdated: "2024-01-15"
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Product Header */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Badge className="bg-primary/10 text-primary border-primary/20">
                    {product.category}
                  </Badge>
                  {product.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-surface text-muted-foreground">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {product.title}
                </h1>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground'}`} 
                      />
                    ))}
                    <span className="font-semibold ml-2">{product.rating}</span>
                    <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Download className="h-4 w-4" />
                    <span>{product.downloads} downloads</span>
                  </div>
                </div>

                <p className="text-lg text-muted-foreground">
                  {product.description}
                </p>
              </div>

              {/* Product Image */}
              <div className="mb-8">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-80 object-cover rounded-xl border border-border"
                />
              </div>

              {/* Product Details */}
              <div className="bg-surface rounded-xl p-8 border border-border mb-8">
                <h2 className="text-2xl font-bold mb-6">What's Included</h2>
                <div className="prose prose-invert max-w-none">
                  <div className="whitespace-pre-line text-foreground">
                    {product.fullDescription}
                  </div>
                </div>
              </div>

              {/* Features List */}
              <div className="bg-surface rounded-xl p-8 border border-border">
                <h2 className="text-2xl font-bold mb-6">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Purchase Card */}
              <div className="bg-surface rounded-xl p-6 border border-border mb-8 sticky top-24">
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold text-primary">${product.price}</span>
                    <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
                    <Badge className="bg-destructive/10 text-destructive border-destructive/20">
                      33% OFF
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">One-time purchase, lifetime access</p>
                </div>

                <div className="space-y-3 mb-6">
                  <Button size="lg" className="w-full btn-primary text-lg">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button size="lg" variant="outline" className="w-full btn-ghost">
                    Buy Now
                  </Button>
                </div>

                <div className="flex items-center gap-2 mb-6">
                  <Button variant="ghost" size="sm" className="flex-1">
                    <Heart className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>

                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span>30-day money-back guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>Last updated {product.lastUpdated}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span>Instant download</span>
                  </div>
                </div>
              </div>

              {/* Seller Card */}
              <div className="bg-surface rounded-xl p-6 border border-border">
                <h3 className="font-semibold mb-4">About the Seller</h3>
                
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={product.seller.avatar} />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{product.seller.name}</span>
                      {product.seller.verified && (
                        <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                      <span>{product.seller.rating} seller rating</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <div className="flex justify-between">
                    <span>Total Sales:</span>
                    <span>{product.seller.totalSales}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Response Time:</span>
                    <span>{product.seller.responseTime}</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full btn-ghost">
                  View All Products
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
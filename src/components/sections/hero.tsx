import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Bot, FileText } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center particle-bg overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-background/70" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-float opacity-60" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-accent rounded-full animate-float opacity-80" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-primary-glow rounded-full animate-float opacity-40" style={{ animationDelay: '4s' }} />
        <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-accent rounded-full animate-float opacity-70" style={{ animationDelay: '1s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-surface/50 backdrop-blur-sm border border-border rounded-full px-4 py-2 mb-8">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">The Future of Digital Commerce</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
            <span className="gradient-text">Marketplace</span>
            <br />
            <span className="text-foreground">for AI Creators</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover, buy, and sell premium AI prompts, n8n automation agents, and digital goods. 
            Join the ecosystem where creativity meets technology.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button size="lg" className="btn-primary px-8 py-4 text-lg font-semibold">
              Start Selling
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="btn-ghost px-8 py-4 text-lg">
              Explore Marketplace
            </Button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            <div className="flex items-center space-x-2 bg-surface/30 backdrop-blur-sm border border-border rounded-full px-4 py-2">
              <FileText className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">AI Prompts</span>
            </div>
            <div className="flex items-center space-x-2 bg-surface/30 backdrop-blur-sm border border-border rounded-full px-4 py-2">
              <Bot className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium">n8n Agents</span>
            </div>
            <div className="flex items-center space-x-2 bg-surface/30 backdrop-blur-sm border border-border rounded-full px-4 py-2">
              <Sparkles className="h-5 w-5 text-primary-glow" />
              <span className="text-sm font-medium">Digital Goods</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-border rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
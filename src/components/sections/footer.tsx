import { Sparkles, Github, Twitter, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-accent animate-glow"></div>
              <span className="text-xl font-bold gradient-text">PromptHub</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              The premier marketplace for AI prompts, automation agents, and digital goods. 
              Empowering creators in the age of artificial intelligence.
            </p>
            <div className="text-sm text-primary animate-pulse">
              ✨ Built for digital creators
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Marketplace</h4>
            <div className="space-y-2">
              <Link to="/marketplace" className="block text-muted-foreground hover:text-primary transition-colors">
                Browse All
              </Link>
              <Link to="/prompts" className="block text-muted-foreground hover:text-primary transition-colors">
                AI Prompts
              </Link>
              <Link to="/agents" className="block text-muted-foreground hover:text-primary transition-colors">
                n8n Agents
              </Link>
              <Link to="/digital-goods" className="block text-muted-foreground hover:text-primary transition-colors">
                Digital Goods
              </Link>
            </div>
          </div>

          {/* Support & Legal */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <div className="space-y-2">
              <Link to="/help" className="block text-muted-foreground hover:text-primary transition-colors">
                Help Center
              </Link>
              <Link to="/seller-guide" className="block text-muted-foreground hover:text-primary transition-colors">
                Seller Guide
              </Link>
              <Link to="/terms" className="block text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy" className="block text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border">
          <div className="text-muted-foreground text-sm mb-4 md:mb-0">
            © 2024 PromptHub. All rights reserved.
          </div>
          
          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <a
              href="#"
              className="w-10 h-10 rounded-lg bg-surface border border-border flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-all duration-300 hover-glow"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-lg bg-surface border border-border flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-all duration-300 hover-glow"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-lg bg-surface border border-border flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-all duration-300 hover-glow"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
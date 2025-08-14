import { Navigation } from "@/components/ui/navigation";
import { HeroSection } from "@/components/sections/hero";
import { FeaturedProducts } from "@/components/sections/featured-products";
import { StatsSection } from "@/components/sections/stats";
import { Footer } from "@/components/sections/footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <FeaturedProducts />
      <StatsSection />
      <Footer />
    </div>
  );
};

export default Index;

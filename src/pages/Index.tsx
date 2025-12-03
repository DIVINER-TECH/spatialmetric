import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { MarketOverview } from "@/components/home/MarketOverview";
import { FeaturedInsights } from "@/components/home/FeaturedInsights";
import { CategoryCards } from "@/components/home/CategoryCards";
import { Newsletter } from "@/components/home/Newsletter";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <MarketOverview />
        <FeaturedInsights />
        <CategoryCards />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

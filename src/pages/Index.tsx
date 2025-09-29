import HeroSection from "@/components/HeroSection";
import SportsEventsSection from "@/components/SportsEventsSection";
import FeaturesSection from "@/components/FeaturesSection";
import EventsCallToAction from "@/components/EventsCallToAction";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <SportsEventsSection />
      <FeaturesSection />
      <EventsCallToAction />
    </div>
  );
};

export default Index;

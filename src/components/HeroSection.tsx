import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  MapPin, 
  Users, 
  Trophy,
  Play,
  Star
} from "lucide-react";
import heroImage from "@/assets/sports-hero.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="People playing various sports together" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Stats Banner */}
          <div className="inline-flex items-center gap-6 bg-gradient-card rounded-full px-6 py-3 mb-8 shadow-card">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-sports-blue" />
              <span className="text-sm font-medium">2M+ Athletes</span>
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-sports-orange" />
              <span className="text-sm font-medium">500+ Sports</span>
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-sports-green" />
              <span className="text-sm font-medium">200+ Cities</span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Find Your Perfect
            <span className="block bg-gradient-hero bg-clip-text text-transparent">
              Sports Buddy
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Connect with athletes near you. Discover new sports. Build lasting friendships. 
            Join the world's largest sports matching community.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button variant="hero" size="xl" className="w-full sm:w-auto">
              <Play className="w-5 h-5 mr-2" />
              Start Matching
            </Button>
            <Link to="/events">
              <Button variant="outline-sport" size="xl" className="w-full sm:w-auto">
                <MapPin className="w-5 h-5 mr-2" />
                Browse Events
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-sports-orange text-sports-orange" />
              ))}
            </div>
            <span>4.9/5 from 50,000+ reviews</span>
          </div>
        </div>
      </div>

      {/* Floating Cards */}
      <div className="absolute bottom-10 left-10 hidden lg:block">
        <div className="bg-card/90 backdrop-blur-sm rounded-xl p-4 shadow-hover border border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-sports-green/20 rounded-full flex items-center justify-center">
              <Trophy className="w-5 h-5 text-sports-green" />
            </div>
            <div>
              <p className="font-semibold">Basketball Match</p>
              <p className="text-sm text-muted-foreground">Starting in 2 hours</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-32 right-10 hidden lg:block">
        <div className="bg-card/90 backdrop-blur-sm rounded-xl p-4 shadow-hover border border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-sports-orange/20 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-sports-orange" />
            </div>
            <div>
              <p className="font-semibold">5 New Matches</p>
              <p className="text-sm text-muted-foreground">Near your location</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
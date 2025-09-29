import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  MapPin, 
  Users, 
  Trophy,
  Shield,
  MessageCircle,
  Calendar,
  Star,
  Target
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <MapPin className="w-8 h-8 text-sports-blue" />,
      title: "Location-Based Matching",
      description: "Find sports activities and buddies near your location. Connect with athletes in your neighborhood.",
      color: "bg-sports-blue/10"
    },
    {
      icon: <Users className="w-8 h-8 text-sports-orange" />,
      title: "Skill-Based Pairing",
      description: "Match with players of similar skill levels. From beginners to professionals, find your perfect match.",
      color: "bg-sports-orange/10"
    },
    {
      icon: <Calendar className="w-8 h-8 text-sports-green" />,
      title: "Event Creation",
      description: "Create and organize your own sports events. Set preferences, manage participants, and build community.",
      color: "bg-sports-green/10"
    },
    {
      icon: <Shield className="w-8 h-8 text-sports-purple" />,
      title: "Verified Profiles",
      description: "All users go through verification. Play with confidence knowing you're connecting with real athletes.",
      color: "bg-sports-purple/10"
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-sports-blue" />,
      title: "Real-Time Chat",
      description: "Connect instantly with your matches. Plan activities, share tips, and build lasting friendships.",
      color: "bg-sports-blue/10"
    },
    {
      icon: <Trophy className="w-8 h-8 text-sports-orange" />,
      title: "Achievement System",
      description: "Track your progress, earn badges, and climb leaderboards. Stay motivated and celebrate victories.",
      color: "bg-sports-orange/10"
    },
    {
      icon: <Star className="w-8 h-8 text-sports-green" />,
      title: "Rating & Reviews",
      description: "Rate your sports buddies and events. Build reputation and find the best sports experiences.",
      color: "bg-sports-green/10"
    },
    {
      icon: <Target className="w-8 h-8 text-sports-purple" />,
      title: "Smart Recommendations",
      description: "AI-powered suggestions based on your preferences, location, and playing history.",
      color: "bg-sports-purple/10"
    }
  ];

  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose <span className="bg-gradient-hero bg-clip-text text-transparent">Sports Buddy</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our platform offers everything you need to find, connect, and play with like-minded athletes. 
            Join millions of sports enthusiasts worldwide.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="group hover:shadow-hover transition-smooth border-border/50 bg-gradient-card"
            >
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 rounded-full ${feature.color} mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-bounce`}>
                  {feature.icon}
                </div>
                <CardTitle className="text-lg group-hover:text-sports-blue transition-smooth">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="text-center">
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-sports-blue mb-2">2M+</div>
            <div className="text-muted-foreground">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-sports-orange mb-2">500+</div>
            <div className="text-muted-foreground">Sports Categories</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-sports-green mb-2">200+</div>
            <div className="text-muted-foreground">Cities Worldwide</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-sports-purple mb-2">10M+</div>
            <div className="text-muted-foreground">Matches Made</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
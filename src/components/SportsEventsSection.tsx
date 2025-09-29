import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  MapPin, 
  Clock, 
  Users, 
  Calendar,
  Star,
  Filter
} from "lucide-react";

const SportsEventsSection = () => {
  const events = [
    {
      id: 1,
      title: "Basketball Pickup Game",
      sport: "Basketball",
      location: "Downtown Sports Center",
      time: "Today, 6:00 PM",
      participants: "8/10",
      skillLevel: "Intermediate",
      organizer: "Mike Johnson",
      rating: 4.8,
      price: "Free",
      image: "🏀"
    },
    {
      id: 2,
      title: "Tennis Singles Tournament",
      sport: "Tennis",
      location: "City Tennis Club",
      time: "Tomorrow, 2:00 PM",
      participants: "12/16",
      skillLevel: "Advanced",
      organizer: "Sarah Chen",
      rating: 4.9,
      price: "$15",
      image: "🎾"
    },
    {
      id: 3,
      title: "Morning Yoga Session",
      sport: "Yoga",
      location: "Central Park",
      time: "Saturday, 8:00 AM",
      participants: "15/20",
      skillLevel: "Beginner",
      organizer: "Emma Wilson",
      rating: 4.7,
      price: "$10",
      image: "🧘‍♀️"
    },
    {
      id: 4,
      title: "Soccer Match",
      sport: "Soccer",
      location: "Riverside Field",
      time: "Sunday, 4:00 PM",
      participants: "18/22",
      skillLevel: "All Levels",
      organizer: "Carlos Rodriguez",
      rating: 4.6,
      price: "Free",
      image: "⚽"
    },
    {
      id: 5,
      title: "Rock Climbing Adventure",
      sport: "Climbing",
      location: "Adventure Climbing Gym",
      time: "Next Week, 7:00 PM",
      participants: "6/8",
      skillLevel: "Intermediate",
      organizer: "Alex Kim",
      rating: 4.9,
      price: "$25",
      image: "🧗‍♂️"
    },
    {
      id: 6,
      title: "Swimming Training",
      sport: "Swimming",
      location: "Olympic Pool Complex",
      time: "Weekdays, 6:00 AM",
      participants: "10/12",
      skillLevel: "Advanced",
      organizer: "Lisa Park",
      rating: 4.8,
      price: "$20",
      image: "🏊‍♀️"
    }
  ];

  const getSkillColor = (skill: string) => {
    switch (skill) {
      case "Beginner": return "bg-sports-green/20 text-sports-green";
      case "Intermediate": return "bg-sports-orange/20 text-sports-orange";
      case "Advanced": return "bg-sports-purple/20 text-sports-purple";
      default: return "bg-sports-blue/20 text-sports-blue";
    }
  };

  return (
    <section id="events" className="py-20 bg-gradient-card">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Discover <span className="bg-gradient-hero bg-clip-text text-transparent">Sports Events</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Join exciting sports activities happening near you. From casual games to competitive tournaments.
          </p>
          
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <Button variant="outline-sport" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              All Sports
            </Button>
            <Button variant="ghost" size="sm">Basketball</Button>
            <Button variant="ghost" size="sm">Tennis</Button>
            <Button variant="ghost" size="sm">Soccer</Button>
            <Button variant="ghost" size="sm">Swimming</Button>
            <Button variant="ghost" size="sm">More</Button>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {events.map((event) => (
            <Card key={event.id} className="group hover:shadow-hover transition-smooth cursor-pointer border-border/50">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{event.image}</div>
                    <div>
                      <CardTitle className="text-lg group-hover:text-sports-blue transition-smooth">
                        {event.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{event.sport}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className={getSkillColor(event.skillLevel)}>
                    {event.skillLevel}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{event.time}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-sports-blue" />
                    <span className="font-medium">{event.participants}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-sports-orange text-sports-orange" />
                    <span className="text-sm font-medium">{event.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <span className="font-bold text-sports-green">{event.price}</span>
                  <Button variant="sport" size="sm">
                    Join Event
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center">
          <Link to="/events">
            <Button variant="outline-sport" size="lg">
              <Calendar className="w-5 h-5 mr-2" />
              View & Manage Events
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SportsEventsSection;
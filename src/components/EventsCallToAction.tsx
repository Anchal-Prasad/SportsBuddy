import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Plus, Calendar, Users } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const EventsCallToAction = () => {
  const { user } = useAuth();

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to <span className="bg-gradient-hero bg-clip-text text-transparent">Create Events?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start organizing sports events in your community. Connect with players and build lasting friendships.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          <Card className="text-center border-border/50">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center mx-auto mb-4">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg">Create Events</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Set up sports events with all the details - location, time, skill level, and participant limits.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-border/50">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg">Manage Participants</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Track registrations, communicate with participants, and ensure smooth event execution.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-border/50">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg">Schedule & Edit</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Flexible event scheduling with options to edit, cancel, or reschedule as needed.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          {user ? (
            <Link to="/events">
              <Button variant="hero" size="xl">
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Event
              </Button>
            </Link>
          ) : (
            <div className="space-y-4">
              <Link to="/auth">
                <Button variant="hero" size="xl">
                  Sign Up to Create Events
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground">
                Already have an account? <Link to="/auth" className="text-sports-blue hover:underline">Sign in here</Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EventsCallToAction;
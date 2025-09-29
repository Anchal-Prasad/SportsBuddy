import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  Plus, 
  MapPin, 
  Clock, 
  Users, 
  Calendar, 
  Edit, 
  Trash2,
  User
} from 'lucide-react';

interface SportsEvent {
  id: string;
  title: string;
  description: string | null;
  sport_category_id: string;
  organizer_id: string;
  city_id: string;
  area_id: string;
  event_date: string;
  start_time: string;
  end_time: string;
  venue: string;
  max_participants: number | null;
  current_participants: number | null;
  skill_level: string | null;
  contact_info: string | null;
  is_active: boolean;
  created_at: string;
  sports_categories?: { name: string };
  cities?: { name: string };
  areas?: { name: string };
  profiles?: { full_name: string };
}

interface SportCategory {
  id: string;
  name: string;
}

interface City {
  id: string;
  name: string;
}

interface Area {
  id: string;
  name: string;
  city_id: string;
}

const Events = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [events, setEvents] = useState<SportsEvent[]>([]);
  const [sportsCategories, setSportsCategories] = useState<SportCategory[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [filteredAreas, setFilteredAreas] = useState<Area[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<SportsEvent | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    sport_category_id: '',
    city_id: '',
    area_id: '',
    event_date: '',
    start_time: '',
    end_time: '',
    venue: '',
    max_participants: '',
    skill_level: '',
    contact_info: ''
  });

  // Validation function
  const validateForm = () => {
    const errors = [];
    
    if (!formData.title.trim()) errors.push('Event title is required');
    if (!formData.sport_category_id) errors.push('Sport category is required');
    if (!formData.city_id) errors.push('City is required');
    if (!formData.area_id) errors.push('Area is required');
    if (!formData.venue.trim()) errors.push('Venue is required');
    if (!formData.event_date) errors.push('Event date is required');
    if (!formData.start_time) errors.push('Start time is required');
    if (!formData.end_time) errors.push('End time is required');
    
    // Validate date is not in the past
    const eventDate = new Date(formData.event_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (eventDate < today) {
      errors.push('Event date cannot be in the past');
    }
    
    // Validate time logic
    if (formData.start_time && formData.end_time && formData.start_time >= formData.end_time) {
      errors.push('End time must be after start time');
    }
    
    // Validate max participants
    if (formData.max_participants && parseInt(formData.max_participants) < 2) {
      errors.push('Minimum 2 participants required');
    }
    
    return errors;
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      sport_category_id: '',
      city_id: '',
      area_id: '',
      event_date: '',
      start_time: '',
      end_time: '',
      venue: '',
      max_participants: '',
      skill_level: '',
      contact_info: ''
    });
  };

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from('sports_events')
      .select(`
        *,
        sports_categories(name),
        cities(name),
        areas(name),
        profiles(full_name)
      `)
      .eq('is_active', true)
      .order('event_date', { ascending: true });

    if (error) {
      toast({
        title: "Error fetching events",
        description: error.message,
        variant: "destructive"
      });
    } else {
      setEvents(data || []);
    }
  };

  const fetchCategories = async () => {
    const { data } = await supabase
      .from('sports_categories')
      .select('*')
      .order('name');
    setSportsCategories(data || []);
  };

  const fetchCities = async () => {
    const { data } = await supabase
      .from('cities')
      .select('*')
      .order('name');
    setCities(data || []);
  };

  const fetchAreas = async () => {
    const { data } = await supabase
      .from('areas')
      .select('*')
      .order('name');
    setAreas(data || []);
  };

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([
        fetchEvents(),
        fetchCategories(),
        fetchCities(),
        fetchAreas()
      ]);
      setLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (formData.city_id) {
      const cityAreas = areas.filter(area => area.city_id === formData.city_id);
      setFilteredAreas(cityAreas);
    } else {
      setFilteredAreas([]);
    }
  }, [formData.city_id, areas]);

  const handleEditEvent = (event: SportsEvent) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description || '',
      sport_category_id: event.sport_category_id,
      city_id: event.city_id,
      area_id: event.area_id,
      event_date: event.event_date,
      start_time: event.start_time,
      end_time: event.end_time,
      venue: event.venue,
      max_participants: event.max_participants?.toString() || '',
      skill_level: event.skill_level || '',
      contact_info: event.contact_info || ''
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !editingEvent) return;

    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      toast({
        title: "Validation Error",
        description: validationErrors.join(', '),
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const eventData = {
        title: formData.title.trim(),
        description: formData.description.trim() || null,
        sport_category_id: formData.sport_category_id,
        city_id: formData.city_id,
        area_id: formData.area_id,
        event_date: formData.event_date,
        start_time: formData.start_time,
        end_time: formData.end_time,
        venue: formData.venue.trim(),
        max_participants: formData.max_participants ? parseInt(formData.max_participants) : null,
        skill_level: formData.skill_level && formData.skill_level.trim() !== '' ? formData.skill_level : null,
        contact_info: formData.contact_info.trim() || null,
      };

      const { error } = await supabase
        .from('sports_events')
        .update(eventData)
        .eq('id', editingEvent.id)
        .eq('organizer_id', user.id);

      if (error) {
        console.error('Update error:', error);
        toast({
          title: "Error updating event",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Success!",
          description: "Your event has been updated successfully."
        });
        
        setIsEditDialogOpen(false);
        setEditingEvent(null);
        resetForm();
        await fetchEvents();
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Unexpected error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    // Validate form
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      toast({
        title: "Validation Error",
        description: validationErrors.join(', '),
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare data for insertion - ensure all fields match database schema
      const eventData = {
        title: formData.title.trim(),
        description: formData.description.trim() || null,
        sport_category_id: formData.sport_category_id,
        organizer_id: user.id,
        city_id: formData.city_id,
        area_id: formData.area_id,
        event_date: formData.event_date,
        start_time: formData.start_time,
        end_time: formData.end_time,
        venue: formData.venue.trim(),
        max_participants: formData.max_participants ? parseInt(formData.max_participants) : null,
        current_participants: 0,
        skill_level: formData.skill_level && formData.skill_level.trim() !== '' ? formData.skill_level : null,
        contact_info: formData.contact_info.trim() || null,
        is_active: true
      };

      const { data, error } = await supabase
        .from('sports_events')
        .insert([eventData])
        .select();

      if (error) {
        console.error('Supabase error:', error);
        toast({
          title: "Error creating event",
          description: error.message || "Failed to create event. Please try again.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Success!",
          description: "Your event has been created successfully and is now live."
        });
        
        setIsCreateDialogOpen(false);
        resetForm();
        await fetchEvents();
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Unexpected error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    const { error } = await supabase
      .from('sports_events')
      .update({ is_active: false })
      .eq('id', eventId);

    if (error) {
      toast({
        title: "Error deleting event",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Event deleted",
        description: "The event has been removed successfully."
      });
      fetchEvents();
    }
  };

  const canManageEvent = (event: SportsEvent) => {
    return user && (event.organizer_id === user.id || profile?.role === 'admin');
  };

  const getSkillColor = (skill: string | null) => {
    if (!skill) return "bg-muted/20 text-muted-foreground";
    switch (skill.toLowerCase()) {
      case "beginner": return "bg-green-100 text-green-800";
      case "intermediate": return "bg-yellow-100 text-yellow-800";
      case "advanced": return "bg-red-100 text-red-800";
      case "all": return "bg-blue-100 text-blue-800";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Please sign in to manage events</h1>
        <p className="text-muted-foreground">You need to be logged in to view and create sports events.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Sports Events</h1>
          <p className="text-muted-foreground">Create and manage sports events in your area</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="hero">
              <Plus className="w-4 h-4 mr-2" />
              Create Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Sports Event</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Event Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Enter event title"
                    maxLength={100}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="sport_category_id">Sport Category *</Label>
                  <Select value={formData.sport_category_id} onValueChange={(value) => setFormData({...formData, sport_category_id: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sport" />
                    </SelectTrigger>
                    <SelectContent>
                      {sportsCategories.map(category => (
                        <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe your event, rules, what to bring, etc."
                  rows={3}
                  maxLength={500}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city_id">City *</Label>
                  <Select value={formData.city_id} onValueChange={(value) => setFormData({...formData, city_id: value, area_id: ''})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map(city => (
                        <SelectItem key={city.id} value={city.id}>{city.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="area_id">Area *</Label>
                  <Select value={formData.area_id} onValueChange={(value) => setFormData({...formData, area_id: value})} disabled={!formData.city_id}>
                    <SelectTrigger>
                      <SelectValue placeholder={formData.city_id ? "Select area" : "Select city first"} />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredAreas.map(area => (
                        <SelectItem key={area.id} value={area.id}>{area.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="venue">Venue *</Label>
                <Input
                  id="venue"
                  value={formData.venue}
                  onChange={(e) => setFormData({...formData, venue: e.target.value})}
                  placeholder="Stadium, gym, park, court name..."
                  maxLength={100}
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="event_date">Date *</Label>
                  <Input
                    id="event_date"
                    type="date"
                    value={formData.event_date}
                    onChange={(e) => setFormData({...formData, event_date: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="start_time">Start Time *</Label>
                  <Input
                    id="start_time"
                    type="time"
                    value={formData.start_time}
                    onChange={(e) => setFormData({...formData, start_time: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="end_time">End Time *</Label>
                  <Input
                    id="end_time"
                    type="time"
                    value={formData.end_time}
                    onChange={(e) => setFormData({...formData, end_time: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="max_participants">Max Participants</Label>
                  <Input
                    id="max_participants"
                    type="number"
                    min="2"
                    max="100"
                    value={formData.max_participants}
                    onChange={(e) => setFormData({...formData, max_participants: e.target.value})}
                    placeholder="Leave empty for unlimited"
                  />
                </div>
                <div>
                  <Label htmlFor="skill_level">Skill Level</Label>
                  <Select value={formData.skill_level} onValueChange={(value) => setFormData({...formData, skill_level: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select skill level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                      <SelectItem value="all">All Levels</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="contact_info">Contact Information</Label>
                <Input
                  id="contact_info"
                  value={formData.contact_info}
                  onChange={(e) => setFormData({...formData, contact_info: e.target.value})}
                  placeholder="Phone number, WhatsApp, email..."
                  maxLength={100}
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsCreateDialogOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  variant="hero"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating Event...' : 'Create Event'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Edit Event Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Event</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleUpdateEvent} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-title">Event Title *</Label>
                  <Input
                    id="edit-title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Enter event title"
                    maxLength={100}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="edit-sport_category_id">Sport Category *</Label>
                  <Select value={formData.sport_category_id} onValueChange={(value) => setFormData({...formData, sport_category_id: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sport" />
                    </SelectTrigger>
                    <SelectContent>
                      {sportsCategories.map(category => (
                        <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe your event, rules, what to bring, etc."
                  rows={3}
                  maxLength={500}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-city_id">City *</Label>
                  <Select value={formData.city_id} onValueChange={(value) => setFormData({...formData, city_id: value, area_id: ''})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map(city => (
                        <SelectItem key={city.id} value={city.id}>{city.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-area_id">Area *</Label>
                  <Select value={formData.area_id} onValueChange={(value) => setFormData({...formData, area_id: value})} disabled={!formData.city_id}>
                    <SelectTrigger>
                      <SelectValue placeholder={formData.city_id ? "Select area" : "Select city first"} />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredAreas.map(area => (
                        <SelectItem key={area.id} value={area.id}>{area.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="edit-venue">Venue *</Label>
                <Input
                  id="edit-venue"
                  value={formData.venue}
                  onChange={(e) => setFormData({...formData, venue: e.target.value})}
                  placeholder="Stadium, gym, park, court name..."
                  maxLength={100}
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="edit-event_date">Date *</Label>
                  <Input
                    id="edit-event_date"
                    type="date"
                    value={formData.event_date}
                    onChange={(e) => setFormData({...formData, event_date: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="edit-start_time">Start Time *</Label>
                  <Input
                    id="edit-start_time"
                    type="time"
                    value={formData.start_time}
                    onChange={(e) => setFormData({...formData, start_time: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="edit-end_time">End Time *</Label>
                  <Input
                    id="edit-end_time"
                    type="time"
                    value={formData.end_time}
                    onChange={(e) => setFormData({...formData, end_time: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-max_participants">Max Participants</Label>
                  <Input
                    id="edit-max_participants"
                    type="number"
                    min="2"
                    max="100"
                    value={formData.max_participants}
                    onChange={(e) => setFormData({...formData, max_participants: e.target.value})}
                    placeholder="Leave empty for unlimited"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-skill_level">Skill Level</Label>
                  <Select value={formData.skill_level} onValueChange={(value) => setFormData({...formData, skill_level: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select skill level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                      <SelectItem value="all">All Levels</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="edit-contact_info">Contact Information</Label>
                <Input
                  id="edit-contact_info"
                  value={formData.contact_info}
                  onChange={(e) => setFormData({...formData, contact_info: e.target.value})}
                  placeholder="Phone number, WhatsApp, email..."
                  maxLength={100}
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsEditDialogOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  variant="hero"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Updating Event...' : 'Update Event'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card key={event.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{event.sports_categories?.name}</p>
                </div>
                {canManageEvent(event) && (
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEditEvent(event)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeleteEvent(event.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              {event.skill_level && (
                <Badge className={getSkillColor(event.skill_level)}>
                  {event.skill_level === 'all' ? 'All Levels' : event.skill_level.charAt(0).toUpperCase() + event.skill_level.slice(1)}
                </Badge>
              )}
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{event.cities?.name}, {event.areas?.name}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{new Date(event.event_date).toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{event.start_time} - {event.end_time}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{event.venue}</span>
              </div>
              
              {event.max_participants && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{event.current_participants || 0}/{event.max_participants} participants</span>
                </div>
              )}
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                <span>Organized by {event.profiles?.full_name || 'Unknown'}</span>
              </div>
              
              {event.description && (
                <p className="text-sm text-muted-foreground mt-2">
                  {event.description}
                </p>
              )}
              
              {event.contact_info && (
                <div className="mt-3 pt-3 border-t">
                  <p className="text-xs text-muted-foreground">Contact: {event.contact_info}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {events.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">No events found</h3>
          <p className="text-muted-foreground mb-4">
            Be the first to create a sports event in your area!
          </p>
          <Button 
            variant="hero" 
            onClick={() => setIsCreateDialogOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Your First Event
          </Button>
        </div>
      )}
    </div>
  );
};

export default Events;
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Search, Calendar, Mail, Phone, FileText } from "lucide-react";

interface Booking {
  id: string;
  booking_ref: string;
  tour_name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  start_date: string;
  end_date: string | null;
  group_size: number;
  status: string;
  special_requests: string | null;
  created_at: string;
}

const MyBookings = () => {
  const { user, loading: authLoading } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchRef, setSearchRef] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    } else if (user) {
      fetchUserBookings();
    }
  }, [user, authLoading, navigate]);

  const fetchUserBookings = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('email', user.email)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setBookings(data || []);
      setSearched(true);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load bookings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const searchByConfirmation = async () => {
    if (!searchRef.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a confirmation number",
        variant: "destructive",
      });
      return;
    }

    if (!user?.email) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to search bookings.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Query with both confirmation number AND user email
      const { data: userBooking, error: userError } = await supabase
        .from('bookings')
        .select('*')
        .eq('booking_ref', searchRef.toUpperCase())
        .eq('email', user.email)
        .maybeSingle();

      if (userError) throw userError;

      // If found, display the booking
      if (userBooking) {
        setBookings([userBooking]);
        setSearched(true);
        setLoading(false);
        return;
      }

      // If not found, check if booking exists for another user
      const { data: existingBooking, error: checkError } = await supabase
        .from('bookings')
        .select('booking_ref')
        .eq('booking_ref', searchRef.toUpperCase())
        .maybeSingle();

      if (checkError) throw checkError;

      if (existingBooking) {
        // Booking exists but belongs to another account
        setBookings([]);
        toast({
          title: "Access Denied",
          description: "This confirmation number does not belong to your account.",
          variant: "destructive",
        });
      } else {
        // No booking exists at all
        setBookings([]);
        toast({
          title: "Not Found",
          description: "No booking found.",
          variant: "destructive",
        });
      }

      setSearched(true);
    } catch (error: any) {
      console.error('Search error:', error);
      toast({
        title: "Error",
        description: "Failed to search for booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-accent/10 to-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">My Bookings</h1>
            <p className="text-muted-foreground">
              View and track your Grant Expedition reservations
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Search by Confirmation Number</CardTitle>
              <CardDescription>
                Enter your booking confirmation number to view details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="confirmationRef" className="sr-only">
                    Confirmation Number
                  </Label>
                  <Input
                    id="confirmationRef"
                    placeholder="e.g., ABC123XYZ"
                    value={searchRef}
                    onChange={(e) => setSearchRef(e.target.value.toUpperCase())}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        searchByConfirmation();
                      }
                    }}
                    maxLength={20}
                  />
                </div>
                <Button onClick={searchByConfirmation} disabled={loading}>
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchRef('');
                    fetchUserBookings();
                  }} 
                  disabled={loading}
                >
                  View All
                </Button>
              </div>
            </CardContent>
          </Card>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading bookings...</p>
            </div>
          ) : bookings.length > 0 ? (
            <div className="space-y-6">
              {bookings.map((booking) => (
                <Card key={booking.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-2xl mb-2">
                          {booking.tour_name}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          Confirmation: <span className="font-mono font-semibold">{booking.booking_ref}</span>
                        </CardDescription>
                      </div>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground">Travel Dates</p>
                          <p className="font-medium">
                            {new Date(booking.start_date).toLocaleDateString()}
                            {booking.end_date && ` - ${new Date(booking.end_date).toLocaleDateString()}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground">Contact</p>
                          <p className="font-medium">{booking.email}</p>
                          {booking.phone && <p className="text-sm">{booking.phone}</p>}
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Guest Name</p>
                        <p className="font-medium">
                          {booking.first_name} {booking.last_name}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Group Size</p>
                        <p className="font-medium">{booking.group_size} people</p>
                      </div>
                    </div>

                    {booking.special_requests && (
                      <div>
                        <p className="text-sm text-muted-foreground">Special Requests</p>
                        <p className="text-sm mt-1">{booking.special_requests}</p>
                      </div>
                    )}

                    <div className="pt-4 border-t">
                      <p className="text-xs text-muted-foreground">
                        Booked on {new Date(booking.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : searched ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground mb-4">No bookings found</p>
                <Button onClick={() => navigate('/book')}>Make a Booking</Button>
              </CardContent>
            </Card>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;

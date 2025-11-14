import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Shield, Filter } from "lucide-react";

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
  content_type: string | null;
  content_name: string | null;
}

const AdminDashboard = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [highlightedBookingRef, setHighlightedBookingRef] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate('/admin-login');
    } else if (user && isAdmin) {
      // Check for bookingRef query param
      const params = new URLSearchParams(window.location.search);
      const bookingRef = params.get('bookingRef');
      if (bookingRef) {
        setHighlightedBookingRef(bookingRef);
      }
      fetchBookings();
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (statusFilter === "all") {
      setFilteredBookings(bookings);
    } else {
      setFilteredBookings(bookings.filter(b => b.status.toLowerCase() === statusFilter));
    }
  }, [statusFilter, bookings]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setBookings(data || []);
      setFilteredBookings(data || []);
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

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', bookingId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Booking status updated successfully.",
      });

      fetchBookings();
      setDialogOpen(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update booking status. Please try again.",
        variant: "destructive",
      });
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

  const getStatusLabel = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'Accepted';
      case 'cancelled':
        return 'Denied';
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  const getStatusCount = (status: string) => {
    if (status === "all") return bookings.length;
    return bookings.filter(b => b.status.toLowerCase() === status).length;
  };

  if (authLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-secondary/10 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-full bg-secondary/10">
              <Shield className="w-6 h-6 text-secondary" />
            </div>
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          </div>
          <p className="text-muted-foreground">Manage all bookings and reservations</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Bookings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{getStatusCount("all")}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">
                {getStatusCount("pending")}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Accepted
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {getStatusCount("confirmed")}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Denied
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">
                {getStatusCount("cancelled")}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Table */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>All Bookings</CardTitle>
                <CardDescription>View and manage customer reservations</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Accepted</SelectItem>
                    <SelectItem value="cancelled">Denied</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading bookings...</p>
              </div>
            ) : filteredBookings.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Confirmation</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Tour</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Group Size</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBookings.map((booking) => (
                      <TableRow
                        key={booking.id}
                        className={`cursor-pointer hover:bg-muted/50 ${
                          highlightedBookingRef === booking.booking_ref 
                            ? 'bg-primary/10 border-l-4 border-primary' 
                            : ''
                        }`}
                      >
                        <TableCell className="font-mono text-sm">
                          {booking.booking_ref}
                        </TableCell>
                        <TableCell>
                          {booking.first_name} {booking.last_name}
                        </TableCell>
                        <TableCell className="text-sm">{booking.email}</TableCell>
                        <TableCell>{booking.tour_name}</TableCell>
                        <TableCell>
                          {new Date(booking.start_date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{booking.group_size}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(booking.status)}>
                            {getStatusLabel(booking.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedBooking(booking);
                              setDialogOpen(true);
                            }}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No bookings found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Booking Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>
              Confirmation: {selectedBooking?.booking_ref}
            </DialogDescription>
          </DialogHeader>
          
          {selectedBooking && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Customer Name</p>
                  <p className="font-medium">
                    {selectedBooking.first_name} {selectedBooking.last_name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{selectedBooking.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{selectedBooking.phone || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Group Size</p>
                  <p className="font-medium">{selectedBooking.group_size} people</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Tour/Experience</p>
                <p className="font-medium">{selectedBooking.tour_name}</p>
                {selectedBooking.content_type && selectedBooking.content_name && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedBooking.content_type}: {selectedBooking.content_name}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Start Date</p>
                  <p className="font-medium">
                    {new Date(selectedBooking.start_date).toLocaleDateString()}
                  </p>
                </div>
                {selectedBooking.end_date && (
                  <div>
                    <p className="text-sm text-muted-foreground">End Date</p>
                    <p className="font-medium">
                      {new Date(selectedBooking.end_date).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>

              {selectedBooking.special_requests && (
                <div>
                  <p className="text-sm text-muted-foreground">Special Requests</p>
                  <p className="text-sm mt-1 whitespace-pre-wrap">
                    {selectedBooking.special_requests}
                  </p>
                </div>
              )}

              <div>
                <p className="text-sm text-muted-foreground">Booking Date</p>
                <p className="text-sm">
                  {new Date(selectedBooking.created_at).toLocaleString()}
                </p>
              </div>

              <div className="pt-4 border-t">
                <Label className="text-sm font-medium mb-2 block">Update Status</Label>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => updateBookingStatus(selectedBooking.id, 'pending')}
                    disabled={selectedBooking.status.toLowerCase() === 'pending'}
                  >
                    Pending
                  </Button>
                  <Button
                    variant="default"
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={() => updateBookingStatus(selectedBooking.id, 'confirmed')}
                    disabled={selectedBooking.status.toLowerCase() === 'confirmed'}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => updateBookingStatus(selectedBooking.id, 'cancelled')}
                    disabled={selectedBooking.status.toLowerCase() === 'cancelled'}
                  >
                    Deny
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;

import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Clock, DollarSign, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

// Generate a random 8-character alphanumeric confirmation code
const generateConfirmationNumber = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const bookingSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100),
  lastName: z.string().trim().min(1, "Last name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().max(20).optional(),
  groupSize: z.number().min(1, "Group size must be at least 1").max(100),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  specialRequests: z.string().max(2000).optional(),
});

interface Tour {
  id: string;
  name: string;
  location?: string;
  duration_days?: number;
  base_price?: number;
  description?: string;
  duration?: string;
  price?: number;
  region?: string;
  image_url?: string;
}

const Book = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [tours, setTours] = useState<Tour[]>([]);
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [contentType, setContentType] = useState<'safari' | 'activity' | 'location'>('safari');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [groupSize, setGroupSize] = useState("1");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    loadTours();
  }, []);

  const loadTours = async () => {
    setLoading(true);
    try {
      // Get content type and parameters from URL
      const contentTypeParam = searchParams.get('content_type') || 'safari';
      const contentNameParam = searchParams.get('content_name');
      const contentIdParam = searchParams.get('content_id');
      
      setContentType(contentTypeParam as 'safari' | 'activity' | 'location');
      
      // Determine which table to query based on content type
      const tableName = contentTypeParam === 'safari' ? 'tours' : 
                       contentTypeParam === 'activity' ? 'activities' : 'locations';
      
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;

      if (data) {
        setTours(data);
        
        // Try to match by ID first, then by name
        if (data.length > 0) {
          let matchedContent = null;
          
          if (contentIdParam) {
            matchedContent = data.find((t) => t.id === contentIdParam);
          }
          
          if (!matchedContent && contentNameParam) {
            // Try exact match
            matchedContent = data.find(
              (t) => t.name.toLowerCase() === contentNameParam.toLowerCase()
            );
            
            // Try partial match
            if (!matchedContent) {
              matchedContent = data.find((t) =>
                t.name.toLowerCase().includes(contentNameParam.toLowerCase())
              );
            }
          }
          
          setSelectedTour(matchedContent || data[0]);
        }
      }
    } catch (error) {
      console.error('Error loading content:', error);
      toast({
        title: "Error",
        description: "Failed to load content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!selectedTour) newErrors.tour = "Please select a tour";
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Invalid email format";
    
    const size = parseInt(groupSize);
    if (!groupSize || size < 1) newErrors.groupSize = "Group size must be at least 1";
    
    if (!startDate) newErrors.startDate = "Start date is required";
    else if (new Date(startDate) < new Date(new Date().setHours(0, 0, 0, 0))) {
      newErrors.startDate = "Start date cannot be in the past";
    }
    
    if (endDate && new Date(endDate) < new Date(startDate)) {
      newErrors.endDate = "End date must be on or after start date";
    }
    
    if (!agreedToTerms) newErrors.terms = "You must agree to the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check honeypot
    if (honeypot) {
      toast({
        title: "Error",
        description: "Invalid submission detected.",
        variant: "destructive",
      });
      return;
    }

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please check all required fields.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      const bookingRef = generateConfirmationNumber();

      const { error } = await supabase.from("bookings").insert({
        booking_ref: bookingRef,
        user_id: user?.id || null,
        tour_id: selectedTour?.id,
        tour_name: selectedTour?.name || "",
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
        phone: phone.trim() || null,
        group_size: parseInt(groupSize),
        start_date: startDate,
        end_date: endDate || null,
        special_requests: specialRequests.trim() || null,
        status: "pending",
        content_type: contentType,
        content_name: selectedTour?.name || "",
      });

      if (error) throw error;

      // Send booking notification emails
      try {
        await supabase.functions.invoke('send-booking-notifications', {
          body: {
            bookingRef,
            contentType: contentType,
            contentName: selectedTour?.name || "",
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim(),
            groupSize: parseInt(groupSize),
            startDate,
            endDate: endDate || null,
            specialRequests: specialRequests.trim() || null,
          },
        });
        console.log("Booking notification emails sent successfully");
      } catch (emailError) {
        // Log the error but don't fail the booking
        console.error("Failed to send notification emails:", emailError);
        // Still show success to user since booking was saved
      }

      // Navigate to success page
      navigate(`/book/success?ref=${bookingRef}&content_name=${encodeURIComponent(selectedTour.name)}`);
    } catch (error) {
      console.error("Error submitting booking:", error);
      toast({
        title: "Submission Error",
        description: "Failed to submit your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif uppercase tracking-wide text-secondary mb-4">
            Book Your Adventure
          </h1>
          <p className="text-lg text-muted-foreground">
            Select your tour and complete the booking form below
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Side: Tour Selection/Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Select Your Tour</CardTitle>
                <CardDescription>Choose the adventure that calls to you</CardDescription>
              </CardHeader>
              <CardContent>
                <Select
                  value={selectedTour?.id || ""}
                  onValueChange={(value) => {
                    const tour = tours.find((t) => t.id === value);
                    setSelectedTour(tour || null);
                    setErrors({ ...errors, tour: "" });
                  }}
                >
                  <SelectTrigger className={errors.tour ? "border-destructive" : ""}>
                    <SelectValue placeholder="Choose a tour..." />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {tours.map((tour) => (
                      <SelectItem key={tour.id} value={tour.id}>
                        {tour.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.tour && <p className="text-sm text-destructive mt-1">{errors.tour}</p>}
              </CardContent>
            </Card>

            {selectedTour && (
              <Card className="bg-muted/30">
                <CardHeader>
                  <CardTitle className="text-2xl font-serif uppercase tracking-wide">
                    {selectedTour.name}
                  </CardTitle>
                  <CardDescription>{selectedTour.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-foreground">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span className="font-medium">{selectedTour.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="font-medium">{selectedTour.duration_days} Days</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground">
                    <DollarSign className="w-5 h-5 text-primary" />
                    <span className="font-bold text-xl">
                      From ${selectedTour.base_price?.toLocaleString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Side: Booking Form */}
          <Card>
            <CardHeader>
              <CardTitle>Booking Details</CardTitle>
              <CardDescription>Fill in your information to complete the booking request</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">
                      First Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        setErrors({ ...errors, firstName: "" });
                      }}
                      className={errors.firstName ? "border-destructive" : ""}
                    />
                    {errors.firstName && (
                      <p className="text-sm text-destructive">{errors.firstName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">
                      Last Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                        setErrors({ ...errors, lastName: "" });
                      }}
                      className={errors.lastName ? "border-destructive" : ""}
                    />
                    {errors.lastName && (
                      <p className="text-sm text-destructive">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors({ ...errors, email: "" });
                    }}
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Optional"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="groupSize">
                    Group Size <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="groupSize"
                    type="number"
                    min="1"
                    value={groupSize}
                    onChange={(e) => {
                      setGroupSize(e.target.value);
                      setErrors({ ...errors, groupSize: "" });
                    }}
                    className={errors.groupSize ? "border-destructive" : ""}
                  />
                  {errors.groupSize && (
                    <p className="text-sm text-destructive">{errors.groupSize}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">
                      Preferred Start Date <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={startDate}
                      onChange={(e) => {
                        setStartDate(e.target.value);
                        setErrors({ ...errors, startDate: "" });
                      }}
                      className={errors.startDate ? "border-destructive" : ""}
                    />
                    {errors.startDate && (
                      <p className="text-sm text-destructive">{errors.startDate}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endDate">Preferred End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={endDate}
                      onChange={(e) => {
                        setEndDate(e.target.value);
                        setErrors({ ...errors, endDate: "" });
                      }}
                      className={errors.endDate ? "border-destructive" : ""}
                    />
                    {errors.endDate && (
                      <p className="text-sm text-destructive">{errors.endDate}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialRequests">Special Requests / Notes</Label>
                  <Textarea
                    id="specialRequests"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="Any dietary requirements, accessibility needs, or special requests..."
                    rows={4}
                  />
                </div>

                {/* Honeypot field - hidden from users */}
                <input
                  type="text"
                  name="company"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <Alert className="bg-accent/10 border-accent/20">
                  <AlertDescription className="text-sm text-foreground/80">
                    Booking Inquiries are not binding. Payment will only be necessary upon booking with a member of staff. Inquiries are typically answered in 1-5 business days.
                  </AlertDescription>
                </Alert>

                <div className="flex items-start gap-2 pt-2">
                  <Checkbox
                    id="terms"
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => {
                      setAgreedToTerms(checked as boolean);
                      setErrors({ ...errors, terms: "" });
                    }}
                  />
                  <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                    I understand this is a booking request and that Grant Expedition will contact me
                    to confirm availability and final details. <span className="text-destructive">*</span>
                  </Label>
                </div>
                {errors.terms && <p className="text-sm text-destructive">{errors.terms}</p>}

                <Button
                  type="submit"
                  className="w-full uppercase tracking-wider"
                  size="lg"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Booking Request"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Book;

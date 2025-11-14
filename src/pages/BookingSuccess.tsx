import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Copy, Home, Compass } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BookingSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const bookingRef = searchParams.get("ref");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!bookingRef) {
      navigate("/");
    }
  }, [bookingRef, navigate]);

  const copyToClipboard = () => {
    if (bookingRef) {
      navigator.clipboard.writeText(bookingRef);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Booking reference copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-background flex items-center justify-center">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="flex justify-center">
            <CheckCircle className="w-24 h-24 text-green-600" />
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-serif uppercase tracking-wide text-secondary">
              Booking Request Received!
            </h1>
            <p className="text-lg text-muted-foreground">
              Thank you for choosing Grant Expedition for your adventure
            </p>
          </div>

          <Card className="bg-muted/30">
            <CardHeader>
              <CardTitle className="text-center">Your Booking Reference</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center gap-2">
                <code className="text-2xl font-mono font-bold text-primary px-4 py-2 bg-background rounded-lg">
                  {bookingRef}
                </code>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={copyToClipboard}
                  className="h-10 w-10"
                >
                  <Copy className={`w-4 h-4 ${copied ? "text-green-600" : ""}`} />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Please save this reference number for your records
              </p>
            </CardContent>
          </Card>

          <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-lg text-left">
            <h3 className="font-semibold text-lg mb-2">What happens next?</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>
                  Our team will review your booking request and check availability for your
                  preferred dates
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>
                  We'll contact you at the email address provided within 24-48 hours to confirm
                  details
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>
                  Once confirmed, we'll send you a detailed itinerary and payment instructions
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>If you have any questions, please quote your booking reference number</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              onClick={() => navigate("/")}
              className="uppercase tracking-wider"
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/safaris/tanzania")}
              className="uppercase tracking-wider"
            >
              <Compass className="w-4 h-4 mr-2" />
              View More Safaris
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("contact_submissions")
        .insert({
          name,
          email,
          phone: phone || null,
          message,
        });

      if (error) throw error;

      toast.success("Thank you! We'll contact you soon to plan your adventure.");
      
      // Reset form
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-serif text-secondary mb-6 uppercase tracking-wide">
            Plan Your Journey
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Ready to experience the safari of a lifetime? Connect with us and let's create your perfect adventure.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div>
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-secondary">Phone</h4>
                  <p className="text-muted-foreground">+255 123 456 789</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-secondary">Email</h4>
                  <p className="text-muted-foreground">info@grantexpedition.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-secondary">Location</h4>
                  <p className="text-muted-foreground">Arusha, Tanzania</p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isSubmitting}
                className="h-12"
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
                className="h-12"
              />
            </div>
            <div>
              <Input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={isSubmitting}
                className="h-12"
              />
            </div>
            <div>
              <Textarea
                placeholder="Tell us about your dream safari..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                disabled={isSubmitting}
                className="min-h-[150px]"
              />
            </div>
            <Button 
              type="submit" 
              size="lg" 
              className="w-full bg-primary hover:bg-primary/90 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Inquiry"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

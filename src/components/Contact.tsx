import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().max(20, "Phone must be less than 20 characters").optional().or(z.literal("")),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000, "Message must be less than 2000 characters")
});
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
      // Validate input data
      const validatedData = contactSchema.parse({
        name,
        email,
        phone: phone || "",
        message
      });
      const {
        error
      } = await supabase.from("contact_submissions").insert({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone || null,
        message: validatedData.message
      });
      if (error) throw error;
      toast.success("Thank you! We'll contact you soon to plan your adventure.");

      // Reset form
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Show validation errors
        error.errors.forEach(err => {
          toast.error(err.message);
        });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return <section id="contact" className="min-h-screen pt-2 pb-12 bg-trip-bg scroll-mt-24 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-serif text-secondary mb-6 uppercase tracking-wide">
            questions?
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Contact our team!  
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto px-8 md:px-12">
          <div>
            <h3 className="text-2xl font-semibold mb-6">CONTACT <span className="italic">information</span></h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-secondary">PHONE</h4>
                  <p className="text-muted-foreground">+255 123 456 789</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-secondary">EMAIL</h4>
                  <p className="text-muted-foreground">info@grantexpedition.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-secondary">LOCATION</h4>
                  <p className="text-muted-foreground">Arusha, Tanzania</p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required disabled={isSubmitting} className="h-12" />
            </div>
            <div>
              <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required disabled={isSubmitting} className="h-12" />
            </div>
            <div>
              <Input type="tel" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} disabled={isSubmitting} className="h-12" />
            </div>
            <div>
              <Textarea value={message} onChange={e => setMessage(e.target.value)} required disabled={isSubmitting} className="min-h-[150px]" placeholder="Questions/Comments:" />
            </div>
            <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-white" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Submit"}
            </Button>
          </form>
        </div>
      </div>
    </section>;
};
export default Contact;
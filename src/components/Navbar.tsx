import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm z-50 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary">Safari Tanzania</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("home")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-foreground hover:text-primary transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("safaris")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Safaris
            </button>
            <button
              onClick={() => scrollToSection("gallery")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Gallery
            </button>
            <Button onClick={() => scrollToSection("contact")} size="lg">
              Book Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-4">
            <button
              onClick={() => scrollToSection("home")}
              className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("safaris")}
              className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors"
            >
              Safaris
            </button>
            <button
              onClick={() => scrollToSection("gallery")}
              className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors"
            >
              Gallery
            </button>
            <Button onClick={() => scrollToSection("contact")} className="w-full">
              Book Now
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

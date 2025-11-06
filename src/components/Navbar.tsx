import { useState } from "react";
import { Menu, X, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import grantLogo from "@/assets/grant-expedition-logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    navigate("/");
    setTimeout(() => {
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: "smooth" });
    }, 300);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-24">
          {/* Logo and Branding */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3">
              <img src={grantLogo} alt="Grant Expedition" className="h-14 w-14 object-contain" />
              <div>
                <h1 className="text-xl font-serif text-foreground tracking-wide uppercase">
                  GRANT EXPEDITION
                </h1>
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-3 h-3 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground italic">
                    "A wonderful experience" – Trip Advisor
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("home")}
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors uppercase tracking-wider"
            >
              HOME
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors uppercase tracking-wider">
                SAFARIS
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white z-[100]">
                <DropdownMenuItem asChild>
                  <Link to="/safaris/tanzania" className="cursor-pointer" onClick={() => window.scrollTo(0, 0)}>Tanzania Safaris</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/safaris/migration" className="cursor-pointer" onClick={() => window.scrollTo(0, 0)}>Serengeti and Migration Safaris</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors uppercase tracking-wider">
                ACTIVITIES
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white z-[100]">
                <DropdownMenuItem asChild>
                  <Link to="/activities/hiking" className="cursor-pointer" onClick={() => window.scrollTo(0, 0)}>Hiking Adventures</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/activities/cultural" className="cursor-pointer" onClick={() => window.scrollTo(0, 0)}>Cultural Experiences</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/activities/outdoor" className="cursor-pointer" onClick={() => window.scrollTo(0, 0)}>Outdoor Experiences</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors uppercase tracking-wider">
                LOCATIONS
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white z-[100]">
                <DropdownMenuItem asChild>
                  <Link to="/locations/zanzibar" className="cursor-pointer" onClick={() => window.scrollTo(0, 0)}>Zanzibar Islands</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/locations/mainland" className="cursor-pointer" onClick={() => window.scrollTo(0, 0)}>Mainland Highlights</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/locations/northern-circuit" className="cursor-pointer" onClick={() => window.scrollTo(0, 0)}>Northern Circuit</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              onClick={() => scrollToSection("about")}
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors uppercase tracking-wider"
            >
              INFORMATION
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-foreground p-2"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden pb-6 space-y-4 bg-white">
            <button
              onClick={() => scrollToSection("home")}
              className="block w-full text-left text-sm font-medium text-foreground/70 hover:text-foreground transition-colors uppercase tracking-wider px-4 py-2"
            >
              HOME
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger className="w-full text-left text-sm font-medium text-foreground/70 hover:text-foreground transition-colors uppercase tracking-wider px-4 py-2">
                SAFARIS
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white z-[100]">
                <DropdownMenuItem asChild>
                  <Link to="/safaris/tanzania" onClick={() => { setIsOpen(false); window.scrollTo(0, 0); }} className="cursor-pointer">
                    Tanzania Safaris
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/safaris/migration" onClick={() => { setIsOpen(false); window.scrollTo(0, 0); }} className="cursor-pointer">
                    Serengeti and Migration Safaris
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="w-full text-left text-sm font-medium text-foreground/70 hover:text-foreground transition-colors uppercase tracking-wider px-4 py-2">
                ACTIVITIES
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white z-[100]">
                <DropdownMenuItem asChild>
                  <Link to="/activities/hiking" onClick={() => { setIsOpen(false); window.scrollTo(0, 0); }} className="cursor-pointer">
                    Hiking Adventures
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/activities/cultural" onClick={() => { setIsOpen(false); window.scrollTo(0, 0); }} className="cursor-pointer">
                    Cultural Experiences
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/activities/outdoor" onClick={() => { setIsOpen(false); window.scrollTo(0, 0); }} className="cursor-pointer">
                    Outdoor Experiences
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="w-full text-left text-sm font-medium text-foreground/70 hover:text-foreground transition-colors uppercase tracking-wider px-4 py-2">
                LOCATIONS
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white z-[100]">
                <DropdownMenuItem asChild>
                  <Link to="/locations/zanzibar" onClick={() => { setIsOpen(false); window.scrollTo(0, 0); }} className="cursor-pointer">
                    Zanzibar Islands
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/locations/mainland" onClick={() => { setIsOpen(false); window.scrollTo(0, 0); }} className="cursor-pointer">
                    Mainland Highlights
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/locations/northern-circuit" onClick={() => { setIsOpen(false); window.scrollTo(0, 0); }} className="cursor-pointer">
                    Northern Circuit
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              onClick={() => scrollToSection("about")}
              className="block w-full text-left text-sm font-medium text-foreground/70 hover:text-foreground transition-colors uppercase tracking-wider px-4 py-2"
            >
              INFORMATION
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

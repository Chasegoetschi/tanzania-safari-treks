import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
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
    }, 100);
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
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => scrollToSection("home")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Home
            </button>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Tanzania Safaris</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[400px] p-4 bg-popover">
                      <NavigationMenuLink asChild>
                        <Link to="/safaris/tanzania" className="block p-3 hover:bg-accent rounded-md transition-colors">
                          <div className="font-semibold mb-1">All Tanzania Safaris</div>
                          <div className="text-sm text-muted-foreground">Browse all safari packages</div>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link to="/safaris/tanzania#3-day" className="block p-3 hover:bg-accent rounded-md transition-colors">
                          <div className="font-semibold mb-1">3-Day Safaris</div>
                          <div className="text-sm text-muted-foreground">Quick safari adventures</div>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link to="/safaris/tanzania#5-day" className="block p-3 hover:bg-accent rounded-md transition-colors">
                          <div className="font-semibold mb-1">5-Day Safaris</div>
                          <div className="text-sm text-muted-foreground">Extended safari experience</div>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link to="/safaris/tanzania#7-day" className="block p-3 hover:bg-accent rounded-md transition-colors">
                          <div className="font-semibold mb-1">7-Day Safaris</div>
                          <div className="text-sm text-muted-foreground">Complete safari journey</div>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Migration Safaris</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[400px] p-4 bg-popover">
                      <NavigationMenuLink asChild>
                        <Link to="/safaris/migration" className="block p-3 hover:bg-accent rounded-md transition-colors">
                          <div className="font-semibold mb-1">All Migration Safaris</div>
                          <div className="text-sm text-muted-foreground">Witness the Great Migration</div>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link to="/safaris/migration#serengeti" className="block p-3 hover:bg-accent rounded-md transition-colors">
                          <div className="font-semibold mb-1">Serengeti Migration</div>
                          <div className="text-sm text-muted-foreground">Follow the wildebeest herds</div>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link to="/safaris/migration#river-crossing" className="block p-3 hover:bg-accent rounded-md transition-colors">
                          <div className="font-semibold mb-1">River Crossing Experience</div>
                          <div className="text-sm text-muted-foreground">Mara River crossings</div>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Activities</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[400px] p-4 bg-popover">
                      <NavigationMenuLink asChild>
                        <Link to="/activities/hiking" className="block p-3 hover:bg-accent rounded-md transition-colors">
                          <div className="font-semibold mb-1">Hiking Adventures</div>
                          <div className="text-sm text-muted-foreground">Kilimanjaro, Meru & more</div>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link to="/activities/cultural" className="block p-3 hover:bg-accent rounded-md transition-colors">
                          <div className="font-semibold mb-1">Cultural & Local Experiences</div>
                          <div className="text-sm text-muted-foreground">Maasai villages & local tours</div>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link to="/activities/outdoor" className="block p-3 hover:bg-accent rounded-md transition-colors">
                          <div className="font-semibold mb-1">Outdoor & Nature Experiences</div>
                          <div className="text-sm text-muted-foreground">Balloons, canoeing & night drives</div>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Locations</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[400px] p-4 bg-popover">
                      <NavigationMenuLink asChild>
                        <Link to="/locations/zanzibar" className="block p-3 hover:bg-accent rounded-md transition-colors">
                          <div className="font-semibold mb-1">Zanzibar Islands</div>
                          <div className="text-sm text-muted-foreground">Beach getaways & island adventures</div>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link to="/locations/mainland" className="block p-3 hover:bg-accent rounded-md transition-colors">
                          <div className="font-semibold mb-1">Mainland Highlights</div>
                          <div className="text-sm text-muted-foreground">Serengeti, Ngorongoro & more</div>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link to="/locations/northern-circuit" className="block p-3 hover:bg-accent rounded-md transition-colors">
                          <div className="font-semibold mb-1">Northern Circuit</div>
                          <div className="text-sm text-muted-foreground">Mountain peaks & highlands</div>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <button
              onClick={() => scrollToSection("about")}
              className="text-foreground hover:text-primary transition-colors"
            >
              About Us
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Contact
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
          <div className="md:hidden pb-4 space-y-3">
            <button
              onClick={() => scrollToSection("home")}
              className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors"
            >
              Home
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-between w-full py-2 text-foreground hover:text-primary transition-colors">
                Tanzania Safaris <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-popover">
                <DropdownMenuItem asChild>
                  <Link to="/safaris/tanzania" onClick={() => setIsOpen(false)}>All Tanzania Safaris</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/safaris/tanzania#3-day" onClick={() => setIsOpen(false)}>3-Day Safaris</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/safaris/tanzania#5-day" onClick={() => setIsOpen(false)}>5-Day Safaris</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/safaris/tanzania#7-day" onClick={() => setIsOpen(false)}>7-Day Safaris</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-between w-full py-2 text-foreground hover:text-primary transition-colors">
                Migration Safaris <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-popover">
                <DropdownMenuItem asChild>
                  <Link to="/safaris/migration" onClick={() => setIsOpen(false)}>All Migration Safaris</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/safaris/migration#serengeti" onClick={() => setIsOpen(false)}>Serengeti Migration</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/safaris/migration#river-crossing" onClick={() => setIsOpen(false)}>River Crossing Experience</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-between w-full py-2 text-foreground hover:text-primary transition-colors">
                Activities <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-popover">
                <DropdownMenuItem asChild>
                  <Link to="/activities/hiking" onClick={() => setIsOpen(false)}>Hiking Adventures</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/activities/cultural" onClick={() => setIsOpen(false)}>Cultural Experiences</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/activities/outdoor" onClick={() => setIsOpen(false)}>Outdoor Experiences</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-between w-full py-2 text-foreground hover:text-primary transition-colors">
                Locations <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-popover">
                <DropdownMenuItem asChild>
                  <Link to="/locations/zanzibar" onClick={() => setIsOpen(false)}>Zanzibar Islands</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/locations/mainland" onClick={() => setIsOpen(false)}>Mainland Highlights</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/locations/northern-circuit" onClick={() => setIsOpen(false)}>Northern Circuit</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              onClick={() => scrollToSection("about")}
              className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors"
            >
              About Us
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors"
            >
              Contact
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

import { useState, useEffect } from "react";
import { Menu, X, Star, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import grantLogo from "@/assets/grant-expedition-logo.png";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openSafaris, setOpenSafaris] = useState(false);
  const [openActivities, setOpenActivities] = useState(false);
  const [openDestinations, setOpenDestinations] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    user
  } = useAuth();
  const isHomePage = location.pathname === '/';
  useEffect(() => {
    if (!isHomePage) return;
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);
  const scrollToSection = (id: string) => {
    navigate("/");
    setTimeout(() => {
      const element = document.getElementById(id);
      element?.scrollIntoView({
        behavior: "smooth"
      });
    }, 300);
    setIsOpen(false);
  };
  return <nav className={`fixed top-0 w-full z-50 transition-all duration-400 ${isHomePage ? isScrolled ? 'bg-accent shadow-sm' : 'bg-transparent' : 'bg-accent shadow-sm'}`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-24">
          {/* Logo and Branding */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3">
              <img alt="Grant Expedition" className="h-14 w-14 object-contain" src="/lovable-uploads/f76fd234-d3cc-4575-b93e-f3996af6dcac.png" />
              <div>
                <h1 className="text-[48px] font-bold font-serif tracking-wide uppercase transition-colors text-[hsl(var(--navbar-text))]">
                  GRANT EXPEDITION
                </h1>
                {(!isHomePage || !isScrolled) && <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map(star => <Star key={star} className={`w-3 h-3 transition-colors ${isHomePage && !isScrolled ? 'fill-white text-white' : 'fill-primary text-primary'}`} />)}
                    </div>
                    <span className={`text-xs italic transition-colors ${isHomePage && !isScrolled ? 'text-white/80' : 'text-muted-foreground'}`}>
                      "A wonderful experience" – Trip Advisor
                    </span>
                  </div>}
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <button onClick={() => scrollToSection("home")} className={`text-sm font-medium transition-colors uppercase tracking-wider text-[hsl(var(--navbar-text))]/80 hover:text-[hsl(var(--navbar-text))] ${isHomePage ? 'font-bold' : ''}`}>
              HOME
            </button>

            <button onClick={() => scrollToSection("about")} className="text-sm font-medium transition-colors uppercase tracking-wider whitespace-nowrap text-[hsl(var(--navbar-text))]/80 hover:text-[hsl(var(--navbar-text))]">
              ABOUT US
            </button>

            <DropdownMenu open={openSafaris} onOpenChange={setOpenSafaris}>
              <div onMouseEnter={() => setOpenSafaris(true)} onMouseLeave={() => setOpenSafaris(false)}>
                <DropdownMenuTrigger className={`text-sm font-medium transition-colors uppercase tracking-wider text-[hsl(var(--navbar-text))]/80 hover:text-[hsl(var(--navbar-text))] ${location.pathname.includes('/safaris') ? 'font-bold' : ''}`}>
                  SAFARIS
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-background border z-[100]">
                  <DropdownMenuItem asChild>
                    <Link to="/safaris/tanzania" className="cursor-pointer" onClick={() => window.scrollTo(0, 0)}>Tanzania Safaris</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/safaris/migration" className="cursor-pointer" onClick={() => window.scrollTo(0, 0)}>Serengeti and Migration Safaris</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </div>
            </DropdownMenu>

            <DropdownMenu open={openActivities} onOpenChange={setOpenActivities}>
              <div onMouseEnter={() => setOpenActivities(true)} onMouseLeave={() => setOpenActivities(false)}>
                <DropdownMenuTrigger asChild className={`text-sm font-medium transition-colors uppercase tracking-wider cursor-pointer text-[hsl(var(--navbar-text))]/80 hover:text-[hsl(var(--navbar-text))] ${location.pathname.includes('/activities') ? 'font-bold' : ''}`}>
                  <Link to="/activities/outdoor" onClick={() => window.scrollTo(0, 0)}>
                    ACTIVITIES
                  </Link>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-background border z-[100]">
                  <DropdownMenuItem asChild>
                    <Link to="/activities/hiking-detail" className="cursor-pointer" onClick={() => window.scrollTo(0, 0)}>Hiking Adventures</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/activities/cultural-detail" className="cursor-pointer" onClick={() => window.scrollTo(0, 0)}>Cultural Experiences</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/activities/outdoor-detail" className="cursor-pointer" onClick={() => window.scrollTo(0, 0)}>Outdoor Experiences</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </div>
            </DropdownMenu>

            <DropdownMenu open={openDestinations} onOpenChange={setOpenDestinations}>
              <div onMouseEnter={() => setOpenDestinations(true)} onMouseLeave={() => setOpenDestinations(false)}>
                <DropdownMenuTrigger className={`text-sm font-medium transition-colors uppercase tracking-wider text-[hsl(var(--navbar-text))]/80 hover:text-[hsl(var(--navbar-text))] ${location.pathname.includes('/locations') ? 'font-bold' : ''}`}>
                  DESTINATIONS
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-background border z-[100]">
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
              </div>
            </DropdownMenu>

            <button onClick={() => scrollToSection("contact")} className="text-sm font-medium transition-colors uppercase tracking-wider whitespace-nowrap text-[hsl(var(--navbar-text))]/80 hover:text-[hsl(var(--navbar-text))]">
              CONTACT US
            </button>

            {user ? <Button asChild variant="default">
                <Link to="/account">
                  <User className="w-4 h-4 mr-2" />
                  My Account
                </Link>
              </Button> : <Button asChild variant="default">
                <Link to="/login">Login</Link>
              </Button>}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 transition-colors text-[hsl(var(--navbar-text))]">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && <div className="lg:hidden pb-6 space-y-4 bg-white">
            <button onClick={() => scrollToSection("home")} className="block w-full text-left text-sm font-medium text-foreground/70 hover:text-foreground transition-colors uppercase tracking-wider px-4 py-2">
              HOME
            </button>

            <button onClick={() => scrollToSection("about")} className="block w-full text-left text-sm font-medium text-foreground/70 hover:text-foreground transition-colors uppercase tracking-wider px-4 py-2 whitespace-nowrap">
              ABOUT US
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger className="w-full text-left text-sm font-medium text-foreground/70 hover:text-foreground transition-colors uppercase tracking-wider px-4 py-2">
                SAFARIS
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white z-[100]">
                <DropdownMenuItem asChild>
                  <Link to="/safaris/tanzania" onClick={() => {
                setIsOpen(false);
                window.scrollTo(0, 0);
              }} className="cursor-pointer">
                    Tanzania Safaris
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/safaris/migration" onClick={() => {
                setIsOpen(false);
                window.scrollTo(0, 0);
              }} className="cursor-pointer">
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
                  <Link to="/activities/hiking-detail" onClick={() => {
                setIsOpen(false);
                window.scrollTo(0, 0);
              }} className="cursor-pointer">
                    Hiking Adventures
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/activities/cultural-detail" onClick={() => {
                setIsOpen(false);
                window.scrollTo(0, 0);
              }} className="cursor-pointer">
                    Cultural Experiences
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/activities/outdoor-detail" onClick={() => {
                setIsOpen(false);
                window.scrollTo(0, 0);
              }} className="cursor-pointer">
                    Outdoor Experiences
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="w-full text-left text-sm font-medium text-foreground/70 hover:text-foreground transition-colors uppercase tracking-wider px-4 py-2">
                DESTINATIONS
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white z-[100]">
                <DropdownMenuItem asChild>
                  <Link to="/locations/zanzibar" onClick={() => {
                setIsOpen(false);
                window.scrollTo(0, 0);
              }} className="cursor-pointer">
                    Zanzibar Islands
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/locations/mainland" onClick={() => {
                setIsOpen(false);
                window.scrollTo(0, 0);
              }} className="cursor-pointer">
                    Mainland Highlights
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/locations/northern-circuit" onClick={() => {
                setIsOpen(false);
                window.scrollTo(0, 0);
              }} className="cursor-pointer">
                    Northern Circuit
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <button onClick={() => scrollToSection("contact")} className="block w-full text-left text-sm font-medium text-foreground/70 hover:text-foreground transition-colors uppercase tracking-wider px-4 py-2 whitespace-nowrap">
              CONTACT US
            </button>

            {user ? <Link to="/account" onClick={() => setIsOpen(false)} className="block w-full px-4 py-2">
                <Button variant="default" className="w-full">
                  <User className="w-4 h-4 mr-2" />
                  My Account
                </Button>
              </Link> : <Link to="/login" onClick={() => setIsOpen(false)} className="block w-full px-4 py-2">
                <Button variant="default" className="w-full">
                  Login
                </Button>
              </Link>}
          </div>}
      </div>
    </nav>;
};
export default Navbar;
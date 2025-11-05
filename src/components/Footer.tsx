import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-serif italic mb-4 text-primary">Grant Expedition Ltd</h3>
            <p className="text-white/80 leading-relaxed">
              Creating unforgettable safari experiences in the heart of Africa since 2008. 
              Discover the wild with expert guides and authentic adventures.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2 text-white/80">
              <li><a href="#home" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">About</a></li>
              <li><a href="#safaris" className="hover:text-primary transition-colors">Safaris</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-lg">Connect With Us</h4>
            <p className="text-white/80 mb-4 leading-relaxed">
              Stay connected for safari updates, wildlife photography, and exclusive offers
            </p>
            <div className="flex gap-4 mb-6">
              <a 
                href="https://facebook.com/profile.php?id=100063871123184" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/grant_expedition_ltd/" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
            <div className="space-y-2 text-white/80">
              <p>
                <span className="font-semibold text-white">Email:</span> info@grantexpedition.com
              </p>
              <p>
                <span className="font-semibold text-white">Phone:</span> +255 766 437 358
              </p>
              <p>
                <span className="font-semibold text-white">Address:</span> Arusha, Tanzania
              </p>
            </div>
          </div>
        </div>
        <div className="border-t border-white/20 pt-8 text-center text-white/70">
          <p>&copy; {new Date().getFullYear()} Grant Expedition Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

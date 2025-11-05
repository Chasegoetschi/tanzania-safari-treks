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
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition-colors">Facebook</a>
              <a href="#" className="hover:text-primary transition-colors">Instagram</a>
              <a href="#" className="hover:text-primary transition-colors">Twitter</a>
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

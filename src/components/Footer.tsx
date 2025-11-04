const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Safari Tanzania</h3>
            <p className="text-background/80">
              Creating unforgettable safari experiences in the heart of Africa since 2008.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-background/80">
              <li><a href="#home" className="hover:text-background transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-background transition-colors">About</a></li>
              <li><a href="#safaris" className="hover:text-background transition-colors">Safaris</a></li>
              <li><a href="#contact" className="hover:text-background transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <p className="text-background/80 mb-4">
              Stay connected for safari updates and wildlife photography
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-background transition-colors">Facebook</a>
              <a href="#" className="hover:text-background transition-colors">Instagram</a>
              <a href="#" className="hover:text-background transition-colors">Twitter</a>
            </div>
          </div>
        </div>
        <div className="border-t border-background/20 pt-8 text-center text-background/60">
          <p>&copy; {new Date().getFullYear()} Safari Tanzania. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import grantLogo from "@/assets/grant-expedition-logo-new.png";

const RebrandingDialog = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Show dialog on initial page load
    const hasSeenRebrand = sessionStorage.getItem("hasSeenRebrand");
    if (!hasSeenRebrand) {
      setOpen(true);
      sessionStorage.setItem("hasSeenRebrand", "true");
    }
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] p-0 bg-white border-none shadow-2xl">
        <div className="flex flex-col items-center text-center p-8 md:p-12">
          <img 
            src={grantLogo} 
            alt="Grant Expedition Ltd Logo" 
            className="w-32 h-32 mb-6 object-contain"
          />
          
          <h2 className="text-3xl md:text-4xl font-serif italic text-[#8B7355] mb-6">
            We've Re-branded
          </h2>
          
          <p className="text-base md:text-lg text-[#6B5B4D] leading-relaxed max-w-md">
            Same team. Same passion for the wild. A whole new look inspired by the spirit of safari.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RebrandingDialog;

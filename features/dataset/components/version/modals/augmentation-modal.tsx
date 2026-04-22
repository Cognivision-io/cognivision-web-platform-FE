import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  FlipHorizontal, 
  Sun, 
  Wind, 
  Droplets, 
  Layers,
  Sparkles,
  ArrowUp,
  Check
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AugmentationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (step: { name: string; detail: string }) => void;
  existingSteps: string[];
}

const AUGMENTATION_OPTIONS = [
  { 
    name: "Flip", 
    icon: FlipHorizontal, 
    upgrade: false,
    description: "Horizontal or vertical flipping",
    detail: "Horizontal: True, Vertical: False"
  },
  { 
    name: "Brightness", 
    icon: Sun, 
    upgrade: false,
    description: "Adjust image brightness",
    detail: "Brighten: True, Darken: False, Percent: 91%"
  },
  { 
    name: "Hue", 
    icon: Droplets, 
    upgrade: false,
    description: "Adjust image hue",
    detail: "Degrees: 180"
  },
  { 
    name: "Exposure", 
    icon: Sparkles, 
    upgrade: false,
    description: "Adjust image exposure",
    detail: "Percent: 30%"
  },
  { 
    name: "Blur", 
    icon: Wind, 
    upgrade: false,
    description: "Apply Gaussian blur",
    detail: "Pixels: 1.5"
  },
  { 
    name: "Saturation", 
    icon: Droplets, 
    upgrade: false,
    description: "Adjust image saturation",
    detail: "Percent: 50%"
  },
  { 
    name: "Noise", 
    icon: Sparkles, 
    upgrade: false,
    description: "Add random noise",
    detail: "Percent: 50%"
  },
];

export const AugmentationModal = ({ isOpen, onClose, onAdd, existingSteps }: AugmentationModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl bg-white p-0 overflow-hidden border-none shadow-2xl">
        <DialogHeader className="p-6 border-b border-slate-100">
           <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-[#6841ff]" />
              <DialogTitle className="text-xl font-bold text-slate-800">Augmentation Options</DialogTitle>
           </div>
           <p className="text-sm text-slate-500 mt-2">
             Create new training examples for your model to learn from by generating augmented versions of each image.
           </p>
        </DialogHeader>

        <div className="p-8 grid grid-cols-3 gap-6 max-h-[60vh] overflow-y-auto">
           {AUGMENTATION_OPTIONS.map((option) => {
              const isSelected = existingSteps.includes(option.name);
              const isDisabled = option.upgrade || isSelected;

              return (
                <button
                  key={option.name}
                  onClick={() => {
                    if (!isDisabled) {
                      onAdd({ name: option.name, detail: option.detail || "Applied" });
                      onClose();
                    }
                  }}
                  className={cn(
                    "flex flex-col items-center text-center p-4 rounded-xl border-2 transition-all group relative",
                    isDisabled 
                      ? "border-slate-50 bg-slate-50/50 cursor-not-allowed grayscale" 
                      : "border-slate-100 bg-white hover:border-[#6841ff] hover:shadow-md cursor-pointer"
                  )}
                >
                  <div className={cn(
                    "h-16 w-16 rounded-lg flex items-center justify-center mb-4 transition-transform group-hover:scale-105",
                    isDisabled ? "bg-slate-200 text-slate-400" : "bg-[#f5f3ff] text-[#6841ff]"
                  )}>
                    <option.icon className="h-8 w-8" />
                    {option.upgrade && (
                       <div className="absolute top-2 right-2 bg-slate-300 rounded-full p-1 border border-white">
                          <ArrowUp className="h-3 w-3 text-white" />
                       </div>
                    )}
                    {!option.upgrade && isSelected && (
                       <div className="absolute top-2 right-2 bg-[#6841ff] rounded-full p-1 border border-white">
                          <Check className="h-3 w-3 text-white" />
                       </div>
                    )}
                  </div>
                  <div className="font-bold text-sm text-slate-700 mb-1">{option.name}</div>
                  {option.upgrade ? (
                     <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Upgrade for</div>
                  ) : isSelected ? (
                    <div className="text-[10px] font-bold text-[#6841ff] uppercase tracking-wider">Added</div>
                  ) : null}
                </button>
              );
           })}
        </div>

        <DialogFooter className="p-6 bg-slate-50 border-t border-slate-100">
           <Button variant="outline" onClick={onClose} className="border-slate-200 text-slate-600 font-bold px-6">
             Cancel
           </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

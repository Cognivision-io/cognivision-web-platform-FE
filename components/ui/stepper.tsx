import { cn } from "@/lib/utils";
import { Check, ArrowRight } from "lucide-react";

interface Step {
  id: string;
  label: string;
  description?: string;
  icon: React.ElementType;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export const Stepper = ({ steps, currentStep, className }: StepperProps) => {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const Icon = step.icon;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="flex flex-1 items-center">
              <div className="flex items-center gap-3">
                {/* Icon Circle */}
                <div
                  className={cn(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-all duration-200",
                    isCompleted || isCurrent
                      ? "bg-[#eef2ff] text-[#6841ff]" // Completed/Current: Light blue bg, primary text
                      : "bg-[#f1f5f9] text-slate-400" // Pending: Gray bg, gray text
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </div>

                {/* Text Content */}
                <div className="flex flex-col">
                  <span
                    className={cn(
                      "text-sm font-semibold",
                      isCompleted || isCurrent
                        ? "text-[#6841ff]" // Active/Completed label is purple
                        : "text-slate-500"
                    )}
                  >
                    {step.label}
                  </span>
                  
                  {isCompleted && (
                    <span className="text-[11px] font-medium text-green-500">
                      Completed
                    </span>
                  )}
                  
                  {step.description && (
                    <span className="text-xs text-slate-500">
                      {step.description}
                    </span>
                  )}
                </div>
              </div>

              {/* Arrow Separator */}
              {!isLast && (
                <div className="mx-4 flex-1 flex justify-center">
                   <div className="h-[1px] w-full bg-slate-300 max-w-[100px] relative">
                      <ArrowRight className="absolute -right-1 -top-1.5 h-3 w-3 text-slate-300" />
                   </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

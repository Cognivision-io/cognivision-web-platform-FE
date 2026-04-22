import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface DocPageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
                    heading: string
                    text?: string
}

export function DocPageHeader({
  heading,
  text,
  className,
  ...props
}: DocPageHeaderProps) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <h1 className="scroll-m-20 text-[28px] font-bold tracking-tight text-[#111827]">
        {heading}
      </h1>
      {text && <p className="text-sm text-[#6b7280]">{text}</p>}
      <Separator className="bg-[#ececf5]" />
    </div>
  );
}

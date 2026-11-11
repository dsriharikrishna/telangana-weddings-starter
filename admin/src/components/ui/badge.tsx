import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#C5A46D] focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#762B46] text-white hover:bg-[#542034]",
        secondary:
          "border-transparent bg-[#F4EDE3] text-[#762B46] hover:bg-[#E7DECF]",
        gold:
          "border-[#C5A46D]/40 bg-[#C5A46D]/20 text-[#762B46] font-bold",
        success:
          "border-transparent bg-emerald-100 text-emerald-800",
        outline: "text-[#292524] border-[#E7DECF]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };


"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface VendorMetricCardProps {
  label: string;
  value: string | number;
  sublabel?: string;
  trend?: string;
  icon?: LucideIcon;
  variant?: "default" | "gold" | "crimson" | "emerald";
  className?: string;
}

export function VendorMetricCard({
  label,
  value,
  sublabel,
  trend,
  icon: Icon,
  variant = "default",
  className,
}: VendorMetricCardProps) {
  const variantStyles = {
    default: "bg-white border-[#E7DECF]",
    gold: "bg-amber-50/50 border-amber-200/80",
    crimson: "bg-[#762B46]/5 border-[#762B46]/20",
    emerald: "bg-emerald-50/50 border-emerald-200/80",
  };

  const iconStyles = {
    default: "text-[#762B46] bg-[#762B46]/10",
    gold: "text-amber-700 bg-amber-100",
    crimson: "text-[#762B46] bg-[#762B46]/15",
    emerald: "text-emerald-700 bg-emerald-100",
  };

  return (
    <Card
      className={cn(
        "p-4 rounded-2xl border shadow-2xs transition-all hover:shadow-xs",
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-[10px] font-bold text-[#57534E] uppercase tracking-wider block">
          {label}
        </span>
        {Icon && (
          <div
            className={cn(
              "w-7 h-7 rounded-lg flex items-center justify-center shrink-0",
              iconStyles[variant]
            )}
          >
            <Icon className="w-3.5 h-3.5" />
          </div>
        )}
      </div>

      <div className="mt-2">
        <span className="text-xl sm:text-2xl font-bold font-heading text-[#292524] block">
          {value}
        </span>
        {(sublabel || trend) && (
          <p className="text-[11px] text-[#78716C] mt-0.5 flex items-center gap-1.5 flex-wrap">
            {sublabel && <span>{sublabel}</span>}
            {trend && (
              <span className="text-emerald-700 font-semibold">{trend}</span>
            )}
          </p>
        )}
      </div>
    </Card>
  );
}


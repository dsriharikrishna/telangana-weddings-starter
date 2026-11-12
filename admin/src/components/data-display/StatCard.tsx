import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  iconColor?: string;
  trend?: {
    value: string;
    isPositive?: boolean;
  };
  className?: string;
  onClick?: () => void;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = 'text-[#762B46]',
  trend,
  className,
  onClick,
}: StatCardProps) {
  return (
    <Card 
      onClick={onClick}
      className={cn(
        'border border-[#E7DECF] bg-white shadow-xs transition-shadow',
        onClick && 'cursor-pointer hover:shadow-md',
        className
      )}
    >
      <CardContent className="p-4 flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-stone-500">
            {title}
          </p>
          <p className="text-2xl font-bold text-[#292524] font-heading tracking-tight">
            {value}
          </p>
          {(subtitle || trend) && (
            <div className="flex items-center gap-1.5 text-[11px] text-stone-400">
              {trend && (
                <span className={cn('font-semibold', trend.isPositive ? 'text-emerald-600' : 'text-rose-600')}>
                  {trend.value}
                </span>
              )}
              {subtitle && <span>{subtitle}</span>}
            </div>
          )}
        </div>
        {Icon && (
          <div className={cn('p-2.5 rounded-xl bg-stone-50 shrink-0', iconColor)}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}


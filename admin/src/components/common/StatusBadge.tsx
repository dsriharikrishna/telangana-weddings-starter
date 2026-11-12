import * as React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle2, Clock, XCircle, AlertCircle, 
  HelpCircle, ShieldCheck, Flame 
} from 'lucide-react';

export type StatusType = 
  | 'active'
  | 'verified'
  | 'pending'
  | 'contacted'
  | 'completed'
  | 'rejected'
  | 'suspended'
  | 'matched'
  | 'success'
  | 'warning'
  | 'neutral';

export interface StatusBadgeProps {
  status: string;
  variant?: StatusType;
  label?: string;
  className?: string;
  showIcon?: boolean;
}

export function StatusBadge({
  status,
  variant,
  label,
  className,
  showIcon = true,
}: StatusBadgeProps) {
  const normStatus = (variant || status || '').toLowerCase().trim();

  let badgeVariant = 'outline';
  let customClasses = 'border-stone-200 text-stone-700 bg-stone-50';
  let IconComponent = HelpCircle;

  switch (normStatus) {
    case 'verified':
    case 'approved':
    case 'completed':
    case 'active':
    case 'success':
      badgeVariant = 'success';
      customClasses = 'bg-emerald-100 text-emerald-800 border-emerald-300';
      IconComponent = CheckCircle2;
      break;

    case 'pending':
    case 'in_progress':
    case 'contacted':
    case 'new':
    case 'warning':
      customClasses = 'bg-amber-100 text-amber-800 border-amber-300';
      IconComponent = Clock;
      break;

    case 'rejected':
    case 'failed':
    case 'suspended':
    case 'inactive':
      customClasses = 'bg-rose-100 text-rose-800 border-rose-300';
      IconComponent = XCircle;
      break;

    case 'field_verified':
      customClasses = 'bg-[#762B46] text-white border-transparent';
      IconComponent = ShieldCheck;
      break;

    case 'spotlight':
      customClasses = 'bg-[#C5A46D] text-[#292524] border-transparent font-bold';
      IconComponent = Flame;
      break;

    default:
      customClasses = 'border-stone-200 text-stone-700 bg-stone-50';
      IconComponent = AlertCircle;
      break;
  }

  const displayText = label || status;

  return (
    <Badge
      variant="outline"
      className={cn(
        'text-[10px] inline-flex items-center gap-1 font-medium capitalize py-0.5 px-2 rounded-full',
        customClasses,
        className
      )}
    >
      {showIcon && <IconComponent className="w-3 h-3 shrink-0" />}
      <span>{displayText}</span>
    </Badge>
  );
}


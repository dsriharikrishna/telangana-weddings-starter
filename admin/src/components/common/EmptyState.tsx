import * as React from 'react';
import { cn } from '@/lib/utils';
import { Inbox, LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface EmptyStateProps {
  title?: string;
  description: string;
  icon?: LucideIcon;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  title = 'No Records Found',
  description,
  icon: Icon = Inbox,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn('p-10 text-center flex flex-col items-center justify-center gap-2.5', className)}>
      <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
        <Icon className="w-6 h-6" />
      </div>
      <div className="max-w-xs space-y-1">
        <h3 className="text-sm font-semibold text-stone-800 font-heading">{title}</h3>
        <p className="text-xs text-stone-500 font-body">{description}</p>
      </div>
      {actionLabel && onAction && (
        <Button variant="outline" size="sm" onClick={onAction} className="mt-2 text-xs">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}


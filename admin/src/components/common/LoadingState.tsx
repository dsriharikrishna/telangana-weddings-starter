import * as React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface LoadingStateProps {
  message?: string;
  className?: string;
}

export function LoadingState({
  message = 'Loading data...',
  className,
}: LoadingStateProps) {
  return (
    <div className={cn('p-12 text-center text-xs text-stone-500 flex flex-col items-center justify-center gap-2.5', className)}>
      <Loader2 className="w-5 h-5 animate-spin text-[#762B46]" />
      <span>{message}</span>
    </div>
  );
}


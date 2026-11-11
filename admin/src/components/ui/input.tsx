import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', leftIcon, rightIcon, error, ...props }, ref) => {
    if (leftIcon || rightIcon) {
      return (
        <div className="relative w-full flex items-center">
          {leftIcon && (
            <div className="absolute left-3 text-stone-400 pointer-events-none flex items-center justify-center">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            ref={ref}
            className={cn(
              'flex h-9 w-full rounded-xl border border-stone-200 bg-stone-50/50 px-3 py-1.5 text-xs text-stone-900 placeholder:text-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#762B46]/30 focus:border-[#762B46] disabled:cursor-not-allowed disabled:opacity-50 transition-all',
              leftIcon && 'pl-9',
              rightIcon && 'pr-9',
              error && 'border-rose-400 focus:border-rose-600 focus:ring-rose-500/20 bg-rose-50/30',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 text-stone-400 flex items-center justify-center">
              {rightIcon}
            </div>
          )}
        </div>
      );
    }

    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          'flex h-9 w-full rounded-xl border border-stone-200 bg-stone-50/50 px-3 py-1.5 text-xs text-stone-900 placeholder:text-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#762B46]/30 focus:border-[#762B46] disabled:cursor-not-allowed disabled:opacity-50 transition-all',
          error && 'border-rose-400 focus:border-rose-600 focus:ring-rose-500/20 bg-rose-50/30',
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

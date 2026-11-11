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
            <div className="absolute left-3.5 text-stone-400 pointer-events-none flex items-center justify-center">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            ref={ref}
            className={cn(
              'flex h-10 w-full rounded-xl border border-[#E7DECF] bg-white px-3.5 py-2 text-xs sm:text-sm text-[#292524] placeholder:text-[#57534E]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#762B46]/25 focus:border-[#762B46] disabled:cursor-not-allowed disabled:opacity-50 transition-all shadow-xs',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-rose-400 focus:border-rose-600 focus:ring-rose-500/20 bg-rose-50/20',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 text-stone-400 flex items-center justify-center">
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
          'flex h-10 w-full rounded-xl border border-[#E7DECF] bg-white px-3.5 py-2 text-xs sm:text-sm text-[#292524] placeholder:text-[#57534E]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#762B46]/25 focus:border-[#762B46] disabled:cursor-not-allowed disabled:opacity-50 transition-all shadow-xs',
          error && 'border-rose-400 focus:border-rose-600 focus:ring-rose-500/20 bg-rose-50/20',
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

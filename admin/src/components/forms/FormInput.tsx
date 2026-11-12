import * as React from 'react';
import { cn } from '@/lib/utils';
import { FormError } from './FormError';

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  helperText?: string;
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, leftIcon, rightIcon, helperText, className, id, required, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="space-y-1 w-full text-left">
        {label && (
          <label htmlFor={inputId} className="text-xs font-semibold text-stone-700 block">
            {label} {required && <span className="text-rose-500">*</span>}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            required={required}
            className={cn(
              'w-full px-3 py-2 text-xs rounded-xl border bg-stone-50 transition-colors',
              'focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#762B46]/20 focus:border-[#762B46]',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              error ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200' : 'border-stone-200',
              leftIcon && 'pl-9',
              rightIcon && 'pr-9',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
              {rightIcon}
            </div>
          )}
        </div>
        {helperText && !error && (
          <p className="text-[11px] text-stone-500">{helperText}</p>
        )}
        <FormError message={error} />
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';


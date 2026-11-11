import * as React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ label, error, hint, required, className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('space-y-1.5 w-full', className)} {...props}>
        {label && (
          <label className="text-xs font-semibold text-stone-700 block">
            {label}
            {required && <span className="text-rose-600 ml-0.5">*</span>}
          </label>
        )}
        {children}
        {hint && !error && <p className="text-[11px] text-stone-500">{hint}</p>}
        {error && (
          <p className="text-[11px] text-rose-600 flex items-center gap-1 font-medium mt-1">
            <AlertCircle className="w-3 h-3 shrink-0" />
            <span>{error}</span>
          </p>
        )}
      </div>
    );
  }
);
FormField.displayName = 'FormField';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'flex min-h-[80px] w-full rounded-xl border border-stone-200 bg-stone-50/50 px-3 py-2 text-xs text-stone-900 placeholder:text-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#762B46]/30 focus:border-[#762B46] disabled:cursor-not-allowed disabled:opacity-50 transition-all',
          error && 'border-rose-400 focus:border-rose-600 focus:ring-rose-500/20 bg-rose-50/30',
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          'flex h-9 w-full rounded-xl border border-stone-200 bg-stone-50/50 px-3 py-1.5 text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#762B46]/30 focus:border-[#762B46] disabled:cursor-not-allowed disabled:opacity-50 transition-all',
          error && 'border-rose-400 focus:border-rose-600 focus:ring-rose-500/20 bg-rose-50/30',
          className
        )}
        {...props}
      >
        {children}
      </select>
    );
  }
);
Select.displayName = 'Select';


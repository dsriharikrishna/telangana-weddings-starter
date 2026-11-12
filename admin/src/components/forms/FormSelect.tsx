import * as React from 'react';
import { cn } from '@/lib/utils';
import { FormError } from './FormError';

export interface FormSelectOption {
  label: string;
  value: string;
}

export interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: FormSelectOption[];
  error?: string;
  helperText?: string;
}

export const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, options, error, helperText, className, id, required, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="space-y-1 w-full text-left">
        {label && (
          <label htmlFor={selectId} className="text-xs font-semibold text-stone-700 block">
            {label} {required && <span className="text-rose-500">*</span>}
          </label>
        )}
        <select
          id={selectId}
          ref={ref}
          required={required}
          className={cn(
            'w-full px-3 py-2 text-xs rounded-xl border bg-stone-50 transition-colors',
            'focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#762B46]/20 focus:border-[#762B46]',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error ? 'border-rose-400 focus:border-rose-500' : 'border-stone-200',
            className
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {helperText && !error && (
          <p className="text-[11px] text-stone-500">{helperText}</p>
        )}
        <FormError message={error} />
      </div>
    );
  }
);

FormSelect.displayName = 'FormSelect';


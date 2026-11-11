'use client';

import * as React from 'react';
import { Slot, Slottable } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-xs font-semibold transition-all duration-150 ease-in-out cursor-pointer disabled:pointer-events-none disabled:opacity-50 select-none active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#762B46]/30 focus-visible:ring-offset-1',
  {
    variants: {
      variant: {
        primary: 'bg-[#762B46] text-white hover:bg-[#542034] shadow-sm',
        secondary: 'bg-stone-100 text-stone-800 hover:bg-stone-200 border border-stone-200',
        outline: 'border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 hover:text-stone-900',
        ghost: 'hover:bg-stone-100 text-stone-700 hover:text-stone-900',
        destructive: 'bg-rose-600 text-white hover:bg-rose-700 shadow-sm',
        gold: 'bg-[#C5A46D] text-white font-semibold hover:bg-[#b08e56] shadow-sm',
        link: 'text-[#762B46] underline-offset-4 hover:underline p-0 h-auto',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-7 rounded-lg px-2.5 text-[11px]',
        lg: 'h-10 rounded-xl px-5 text-sm',
        icon: 'h-8 w-8 p-0 rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
        ) : (
          leftIcon && <span className="mr-1.5 flex items-center">{leftIcon}</span>
        )}
        <Slottable>{children}</Slottable>
        {!loading && rightIcon && <span className="ml-1.5 flex items-center">{rightIcon}</span>}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };

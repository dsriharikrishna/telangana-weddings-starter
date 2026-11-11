'use client';

import * as React from 'react';
import { Slot, Slottable } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 ease-in-out cursor-pointer disabled:pointer-events-none disabled:opacity-50 select-none active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#762B46]/30 focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        primary: 'bg-[#762B46] text-[#FAF7F2] hover:bg-[#542034] shadow-sm hover:shadow',
        secondary: 'bg-[#F4EDE3] text-[#762B46] hover:bg-[#E7DECF] border border-[#C5A46D]/30',
        outline: 'border-2 border-[#762B46] bg-transparent text-[#762B46] hover:bg-[#762B46] hover:text-[#FAF7F2]',
        ghost: 'hover:bg-[#F4EDE3] text-[#292524] hover:text-[#762B46]',
        destructive: 'bg-rose-600 text-white hover:bg-rose-700 shadow-sm',
        gold: 'bg-[#C5A46D] text-[#292524] font-semibold hover:bg-[#b08e56] shadow-sm',
        link: 'text-[#762B46] underline-offset-4 hover:underline p-0 h-auto',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 rounded-lg px-3 text-xs',
        lg: 'h-11 rounded-xl px-6 text-sm font-semibold',
        icon: 'h-9 w-9 p-0 rounded-lg',
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
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
        ) : (
          leftIcon && <span className="mr-2 flex items-center">{leftIcon}</span>
        )}
        <Slottable>{children}</Slottable>
        {!loading && rightIcon && <span className="ml-2 flex items-center">{rightIcon}</span>}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };

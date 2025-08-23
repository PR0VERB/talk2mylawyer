import { type ButtonHTMLAttributes, forwardRef } from 'react';
import clsx from 'classnames';
import { Loader2 } from 'lucide-react';
import { motion, type HTMLMotionProps } from 'framer-motion';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'accent' | 'outline' | 'ghost';
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', loading = false, disabled, children, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:bg-gray-50 disabled:text-gray-500 disabled:opacity-50 shadow-sm';
    const variants = {
      primary: 'bg-sky-500 text-white hover:bg-sky-600 hover:shadow-md',
      accent: 'bg-emerald-500 text-white hover:bg-emerald-600 hover:shadow-md',
      outline: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:shadow-md',
      ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
    } as const;

    // Cast props to HTMLMotionProps to satisfy framer-motion typing
    const motionProps = props as unknown as HTMLMotionProps<'button'>;

    return (
      <motion.button
        whileTap={{ scale: 0.98 }}
        ref={ref}
        className={clsx(base, variants[variant], className)}
        disabled={disabled || loading}
        {...motionProps}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </motion.button>
    );
  },
);

Button.displayName = 'Button';


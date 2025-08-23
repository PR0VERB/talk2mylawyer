import { forwardRef, type InputHTMLAttributes, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'classnames';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  helpText?: string;
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, helpText, label, id, onChange, ...props }, ref) => {
    const inputId = id || props.name || undefined;
    const [typingPulse, setTypingPulse] = useState(0);
    const timer = useRef<number | null>(null);

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      // Trigger a short sparkle pulse on each input
      setTypingPulse((n) => n + 1);
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => {
        // allow animation to end naturally
      }, 300);
      onChange?.(e);
    };

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}

        <div className={clsx('relative rounded-xl transition-all duration-200')}
        >
          <input
            id={inputId}
            ref={ref}
            onChange={handleChange}
            className={clsx(
              'block w-full px-4 py-3 border rounded-xl placeholder-gray-400 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200 shadow-sm focus:shadow-md',
              error ? 'border-red-500' : 'border-gray-300',
              'disabled:bg-gray-50 disabled:text-gray-500 disabled:opacity-50',
              className,
            )}
            aria-invalid={!!error}
            aria-describedby={helpText ? `${inputId}-help` : undefined}
            {...props}
          />

          {/* Blue sparkle pulse on the right when typing */}
          <motion.span
            key={typingPulse}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: [0, 1, 0], scale: [0.6, 1.2, 0.8], x: [0, 2, 0] }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(14,165,233,0.8)]"
            aria-hidden="true"
          />
        </div>

        {helpText && (
          <p id={`${inputId}-help`} className="mt-1 text-sm text-gray-500">
            {helpText}
          </p>
        )}
        {error && (
          <p role="alert" className="mt-1 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';


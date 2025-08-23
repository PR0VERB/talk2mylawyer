import { forwardRef, type InputHTMLAttributes } from 'react';
import clsx from 'classnames';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  helpText?: string;
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, helpText, label, id, ...props }, ref) => {
    const inputId = id || props.name || undefined;
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={clsx(
            'block w-full px-4 py-3 border rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200',
            error ? 'border-red-500' : 'border-gray-300',
            'disabled:bg-gray-50 disabled:text-gray-500 disabled:opacity-50',
            className,
          )}
          aria-invalid={!!error}
          aria-describedby={helpText ? `${inputId}-help` : undefined}
          {...props}
        />
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


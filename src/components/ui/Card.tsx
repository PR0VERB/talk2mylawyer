import { type HTMLAttributes } from 'react';
import clsx from 'classnames';

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        // Elegant blue outline & glow on hover/focus within
        'bg-white rounded-xl shadow-sm border border-sky-100 outline outline-1 outline-sky-100/60 focus-within:outline-2 focus-within:outline-sky-300/80 hover:shadow-md transition-all duration-200',
        className,
      )}
      {...props}
    />
  );
}


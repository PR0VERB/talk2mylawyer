import { type HTMLAttributes } from 'react';
import clsx from 'classnames';

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        'bg-white border border-gray-200 rounded-xl shadow-sm',
        className,
      )}
      {...props}
    />
  );
}

